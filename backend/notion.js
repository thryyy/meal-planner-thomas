import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
dotenv.config();

console.log('Notion API Key:', process.env.NOTION_API_KEY);

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

console.log('Notion client:', notion);

export default notion;