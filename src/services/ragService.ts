import { GoogleGenerativeAI } from '@google/generative-ai';

interface FinanceDocument {
  id: string;
  content: string;
  metadata: {
    age?: number;
    gender?: string;
    avenue?: string;
    purpose?: string;
    duration?: string;
  };
}

interface EmbeddingResult {
  embedding: number[];
}

class RAGService {
  private static instance: RAGService;
  private documents: FinanceDocument[] = [];
  private embeddings: Map<string, number[]> = new Map();
  private genAI: GoogleGenerativeAI;

  private constructor() {
    // Use the same API key from your geminiAPI service
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }

  static getInstance(): RAGService {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService();
    }
    return RAGService.instance;
  }

  // Initialize with finance data
  async initializeFinanceData() {
    // Sample finance data based on your CSV structure
    const financeData = [
      {
        age: 25, gender: 'Male', avenue: 'Mutual Funds', purpose: 'Wealth Creation', duration: '5 years',
        advice: 'For young investors focusing on wealth creation, equity mutual funds are ideal. Consider SIP investments in large-cap and mid-cap funds for balanced growth.'
      },
      {
        age: 35, gender: 'Female', avenue: 'Mixed Investments', purpose: 'Child Education', duration: '10 years',
        advice: 'For child education planning, consider hybrid funds with 60-70% equity and 30-40% debt. PPF and child-specific mutual funds are excellent options.'
      },
      {
        age: 45, gender: 'Male', avenue: 'Fixed Deposits', purpose: 'Retirement', duration: '15 years',
        advice: 'For retirement planning, diversify across equity (40%), debt (40%), and safe instruments like PPF and EPF (20%). Consider balanced hybrid funds.'
      },
      {
        age: 30, gender: 'Female', avenue: 'Gold', purpose: 'Emergency Fund', duration: '2 years',
        advice: 'For emergency funds, prioritize liquidity. Gold ETFs, liquid funds, and short-term FDs are suitable. Maintain 6 months of expenses in liquid instruments.'
      },
      {
        age: 28, gender: 'Male', avenue: 'Equity Market', purpose: 'Wealth Creation', duration: '8 years',
        advice: 'Direct equity investments require research and risk tolerance. Start with blue-chip stocks, diversify across sectors, and consider index funds for stability.'
      }
    ];

    // Convert to documents and generate embeddings
    for (let i = 0; i < financeData.length; i++) {
      const data = financeData[i];
      const document: FinanceDocument = {
        id: `doc_${i}`,
        content: `Investment Profile: ${data.age}-year-old ${data.gender} seeking ${data.purpose} through ${data.avenue} over ${data.duration}. 
        
        Recommendation: ${data.advice}
        
        Key factors: Age-appropriate risk tolerance, investment horizon of ${data.duration}, specific goal of ${data.purpose}.`,
        metadata: {
          age: data.age,
          gender: data.gender,
          avenue: data.avenue,
          purpose: data.purpose,
          duration: data.duration
        }
      };

      this.documents.push(document);
      
      // Generate embedding for this document
      try {
        const embedding = await this.generateEmbedding(document.content);
        this.embeddings.set(document.id, embedding);
      } catch (error) {
        console.error('Error generating embedding for document:', document.id, error);
      }
    }

    console.log(`RAG Service initialized with ${this.documents.length} documents`);
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'embedding-001' });
      const result = await model.embedContent(text);
      return result.embedding.values || [];
    } catch (error) {
      console.error('Error generating embedding:', error);
      // Return a dummy embedding if API fails
      return new Array(768).fill(0);
    }
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async retrieveRelevantDocuments(query: string, topK: number = 3): Promise<FinanceDocument[]> {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.generateEmbedding(query);
      
      // Calculate similarities and get top documents
      const similarities: Array<{doc: FinanceDocument, score: number}> = [];
      
      for (const doc of this.documents) {
        const docEmbedding = this.embeddings.get(doc.id);
        if (docEmbedding) {
          const similarity = this.cosineSimilarity(queryEmbedding, docEmbedding);
          similarities.push({ doc, score: similarity });
        }
      }
      
      // Sort by similarity and return top K
      similarities.sort((a, b) => b.score - a.score);
      return similarities.slice(0, topK).map(item => item.doc);
    } catch (error) {
      console.error('Error retrieving documents:', error);
      return [];
    }
  }

  async generateRAGResponse(query: string, context: string = ''): Promise<string> {
    try {
      // Retrieve relevant documents
      const relevantDocs = await this.retrieveRelevantDocuments(query, 3);
      
      // Prepare context from retrieved documents
      const documentContext = relevantDocs
        .map(doc => doc.content)
        .join('\n\n---\n\n');

      // Create enhanced prompt with context
      const enhancedPrompt = `
You are a financial advisor AI assistant. Use the following context from similar investment scenarios to provide personalized financial advice.

CONTEXT FROM SIMILAR CASES:
${documentContext}

PREVIOUS CONVERSATION:
${context}

USER QUERY: ${query}

INSTRUCTIONS:
1. Analyze the user's query and match it with similar scenarios from the context
2. Provide specific, actionable financial advice
3. Mention specific investment instruments (mutual funds, stocks, bonds, etc.)
4. Consider the user's age, goals, and risk tolerance if mentioned
5. Keep the response practical and personalized
6. If the context doesn't fully match, use your general financial knowledge
7. Always include risk disclaimers when appropriate

Please provide a detailed financial recommendation:`;

      // Use Gemini to generate response with RAG context
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(enhancedPrompt);
      
      return result.response.text() || 'I apologize, but I cannot provide a response at the moment. Please try again.';
    } catch (error) {
      console.error('Error generating RAG response:', error);
      return 'I encountered an error while processing your request. Please try asking your question in a different way.';
    }
  }
}

export const ragService = RAGService.getInstance();
