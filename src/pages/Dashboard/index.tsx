import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue, { formatDate } from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const response = await api.get('transactions');
        const { balance, transactions } = response.data;
        setTransactions(transactions);
        setBalance(balance);
      } catch (error) {
        console.log(error);
      }
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {balance.total ? formatValue(balance.income) : '-'}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {balance.outcome
                ? formatValue(balance.outcome)
                : '-'}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {balance.total ? formatValue(balance.total) : '-'}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map(transaction => {
                  return (
                    <tr key={transaction.id}>
                      <td className="title">{transaction.title}</td>
                      {transaction.type === 'income' ? (
                        <td className="income">
                          {formatValue(transaction.value)}
                        </td>
                      ) : (
                        <td className="outcome">
                          {`- ${formatValue(transaction.value)}`}
                        </td>
                      )}
                      <td>{transaction.category.title}</td>
                      {/* <td>{transaction.created_at}</td> */}
                      <td>{formatDate(new Date(transaction.created_at))}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
