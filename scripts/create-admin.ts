// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('\n=== Create Admin User ===\n');

    const email = await question('Email: ');
    if (!email || !email.includes('@')) {
      console.error('Invalid email address');
      process.exit(1);
    }

    const name = await question('Name (optional): ');
    const password = await question('Password: ');

    if (!password || password.length < 6) {
      console.error('Password must be at least 6 characters');
      process.exit(1);
    }

    // Check if user already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      console.error(`\nError: User with email ${email} already exists`);
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.adminUser.create({
      data: {
        email,
        name: name || null,
        passwordHash,
      },
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\nDetails:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Name: ${admin.name || 'N/A'}`);
    console.log(`  ID: ${admin.id}`);
    console.log('\nYou can now login at /admin/login');

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
    rl.close();
    process.exit(1);
  }
}

createAdmin();
