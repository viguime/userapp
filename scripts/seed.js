#!/usr/bin/env node

const fs = require('fs');
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/userapp';

async function seed() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('🌱 Starting database seed...');

    // Read sample data
    const sampleData = JSON.parse(fs.readFileSync('./data/sample_data.json', 'utf8'));
    
    // Clear existing data
    await client.query('TRUNCATE TABLE users CASCADE');
    console.log('✅ Cleared existing users');

    // Insert all users
    for (const user of sampleData) {
      await client.query(
        `INSERT INTO users (
          id, first_name, last_name, email, avatar, school, 
          title, main_skill, secondary_skills, description, active, phone_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          user.id,
          user.first_name,
          user.last_name,
          user.email,
          user.avatar,
          user.school,
          user.title,
          user.main_skill,
          user.secondary_skills || [],
          user.description,
          user.active,
          user.phone_number,
        ]
      );
    }

    const result = await client.query('SELECT COUNT(*) as total FROM users');
    console.log(`✅ Seeded ${result.rows[0].total} users`);
    console.log('🌱 Database seed completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
