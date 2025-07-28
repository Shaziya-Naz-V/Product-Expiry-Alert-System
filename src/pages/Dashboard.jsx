import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardContainer = styled.div`
  padding: 10px 20px 20px 20px;
  background-color: #f5f6fa;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const Card = styled.div`
  flex: 1 1 200px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid black;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.p`
  font-size: 16px;
  color: #777;
`;

const CardValue = styled.h3`
  font-size: 28px;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  width: 95%;
  height: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    expiring: 0,
    expired: 0,
    active: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/products/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching product stats:', error);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Total', value: stats.total },
    { name: 'Expiring', value: stats.expiring },
    { name: 'Expired', value: stats.expired },
    { name: 'Active', value: stats.active },
  ];

  return (
    <DashboardContainer>
      <Title>Product Overview</Title>

      <CardsContainer>
        <Card>
          <CardTitle>Total Products 📦</CardTitle>
          <CardValue>{stats.total}</CardValue>
        </Card>
        <Card>
          <CardTitle>Expiring Soon ⚠️</CardTitle>
          <CardValue>{stats.expiring}</CardValue>
        </Card>
        <Card>
          <CardTitle>Expired Products 📉</CardTitle>
          <CardValue>{stats.expired}</CardValue>
        </Card>
        <Card>
          <CardTitle>Active Product ✅</CardTitle>
          <CardValue>{stats.active}</CardValue>
        </Card>
      </CardsContainer>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
