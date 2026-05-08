import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// 🔍 Validação obrigatória
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('❌ FALTAM SUPABASE_URL ou SUPABASE_KEY no arquivo .env');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/eventos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('eventos').select('*');
    if (error) {
      console.error('❌ Erro Supabase:', error.message);
      return res.status(500).json({ error: error.message });
    }
    res.json(data || []);
  } catch (err) {
    console.error('❌ Erro interno:', err);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

app.listen(4000, () => {
  console.log('✅ Servidor rodando na porta 4000');
  console.log('🔗 Supabase URL:', process.env.SUPABASE_URL);
  console.log('🔑 Supabase Key:', process.env.SUPABASE_KEY ? 'Configurada' : 'FALTANDO');
});