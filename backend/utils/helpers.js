import { v4 as uuidv4 } from 'uuid';

const generatePNR = () => {
  const prefix = 'FLT';
  const random = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}${random}`;
};

export { generatePNR };
