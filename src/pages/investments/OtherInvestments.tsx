
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, Pie, Line } from 'recharts';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  BarChart
} from 'recharts';

const OtherInvestments = () => {
  // Sample data for alternative investments
  const alternativeInvestmentsData = [
    { name: 'P2P Lending', value: 35, fill: '#8884d8' },
    { name: 'Art', value: 25, fill: '#83a6ed' },
    { name: 'Collectibles', value: 15, fill: '#8dd1e1' },
    { name: 'Private Equity', value: 25, fill: '#82ca9d' },
  ];

  const performanceData = [
    {
      year: '2018',
      'P2P Lending': 8.2,
      'Art': 10.5,
      'Collectibles': 6.5,
      'Private Equity': 12.3,
    },
    {
      year: '2019',
      'P2P Lending': 9.5,
      'Art': 11.2,
      'Collectibles': 7.8,
      'Private Equity': 14.1,
    },
    {
      year: '2020',
      'P2P Lending': 7.8,
      'Art': 8.5,
      'Collectibles': 9.2,
      'Private Equity': 10.5,
    },
    {
      year: '2021',
      'P2P Lending': 10.2,
      'Art': 14.6,
      'Collectibles': 12.8,
      'Private Equity': 16.3,
    },
    {
      year: '2022',
      'P2P Lending': 8.9,
      'Art': 12.3,
      'Collectibles': 10.5,
      'Private Equity': 14.8,
    },
  ];

  const riskReturnData = [
    { name: 'P2P Lending', risk: 6.5, return: 8.9 },
    { name: 'Art', risk: 7.8, return: 12.3 },
    { name: 'Collectibles', risk: 5.2, return: 10.5 },
    { name: 'Private Equity', risk: 8.4, return: 14.8 },
    { name: 'Stocks (Comparison)', risk: 7.2, return: 10.1 },
    { name: 'Bonds (Comparison)', risk: 3.5, return: 5.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Alternative <span className="text-fintech-blue">Investments</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explore unique investment opportunities beyond traditional markets
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>P2P Lending</CardTitle>
              <CardDescription>Loan money directly to individuals or small businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-gray-200 h-40 bg-gray-100 flex items-center justify-center mb-3">
                <img src="https://example.com/p2p-lending.jpg" alt="P2P Lending" className="object-cover" />
              </div>
              <p className="text-sm text-gray-600">Expected Returns: 8-12% annually</p>
              <p className="text-sm text-gray-600">Risk Level: Medium</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Art Investment</CardTitle>
              <CardDescription>Invest in artwork that appreciates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-gray-200 h-40 bg-gray-100 flex items-center justify-center mb-3">
                <img src="https://example.com/art-investment.jpg" alt="Art Investment" className="object-cover" />
              </div>
              <p className="text-sm text-gray-600">Expected Returns: 7-20% annually</p>
              <p className="text-sm text-gray-600">Risk Level: Medium-High</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Private Equity</CardTitle>
              <CardDescription>Invest in private companies not listed on public exchanges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border border-gray-200 h-40 bg-gray-100 flex items-center justify-center mb-3">
                <img src="https://example.com/private-equity.jpg" alt="Private Equity" className="object-cover" />
              </div>
              <p className="text-sm text-gray-600">Expected Returns: 10-25% annually</p>
              <p className="text-sm text-gray-600">Risk Level: High</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Investments Breakdown</CardTitle>
              <CardDescription>Distribution of different alternative investment types</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alternativeInvestmentsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Annual returns of different alternative investments</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="P2P Lending" fill="#8884d8" />
                  <Bar dataKey="Art" fill="#83a6ed" />
                  <Bar dataKey="Collectibles" fill="#8dd1e1" />
                  <Bar dataKey="Private Equity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Risk vs. Return Analysis</CardTitle>
            <CardDescription>Compare risk and return profiles of different investment types</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={riskReturnData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Risk (%)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="return" fill="#82ca9d" name="Return %" />
                <Line yAxisId="right" type="monotone" dataKey="risk" stroke="#ff7300" name="Risk %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Minimum Requirements</CardTitle>
              <CardDescription>Minimum capital needed to start investing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>P2P Lending:</span>
                  <span className="font-medium">$500</span>
                </li>
                <li className="flex justify-between">
                  <span>Art Investment:</span>
                  <span className="font-medium">$5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Collectibles:</span>
                  <span className="font-medium">$1,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Private Equity:</span>
                  <span className="font-medium">$10,000</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Platforms</CardTitle>
              <CardDescription>Popular platforms for alternative investments</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>P2P Lending:</span>
                  <span className="font-medium">Prosper, LendingClub</span>
                </li>
                <li className="flex justify-between">
                  <span>Art Investment:</span>
                  <span className="font-medium">Masterworks, Maecenas</span>
                </li>
                <li className="flex justify-between">
                  <span>Collectibles:</span>
                  <span className="font-medium">Rally, Collectable</span>
                </li>
                <li className="flex justify-between">
                  <span>Private Equity:</span>
                  <span className="font-medium">AngelList, EquityZen</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OtherInvestments;
