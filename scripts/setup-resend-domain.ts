/**
 * Setup Resend Domain
 * This script helps you add and verify jbbc.co.jp domain in Resend
 */

import { Resend } from 'resend';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment
config({ path: resolve(__dirname, '../.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function setupDomain() {
  console.log('🔧 Resend Domain Setup for jbbc.co.jp\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Step 1: Check if domain already exists
    console.log('📋 Step 1: Checking existing domains...\n');
    const domains = await resend.domains.list();

    const existingDomain = domains.data?.data?.find((d: any) => d.name === 'jbbc.co.jp');

    if (existingDomain) {
      console.log('✅ Domain jbbc.co.jp already exists in Resend!');
      console.log(`   Domain ID: ${existingDomain.id}`);
      console.log(`   Status: ${existingDomain.status}`);
      console.log('');

      if (existingDomain.status === 'verified') {
        console.log('🎉 Domain is VERIFIED! You can send emails now!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Setup Complete!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return;
      }

      if (existingDomain.status === 'pending' || existingDomain.status === 'not_started') {
        console.log('⏳ Domain verification is PENDING...\n');

        // Try to verify
        console.log('🔄 Attempting to verify domain...\n');
        try {
          const verifyResult = await resend.domains.verify(existingDomain.id);
          console.log('Verification result:', verifyResult);

          if (verifyResult.data?.status === 'verified') {
            console.log('\n🎉 SUCCESS! Domain is now VERIFIED!\n');
            console.log('You can now send emails from: noreply@jbbc.co.jp\n');
          } else {
            console.log('\n⚠️  Verification not complete yet.\n');
            console.log('DNS records need time to propagate (5-30 minutes).\n');
            console.log('Your DNS records in Digital Ocean:');
            console.log('✅ TXT resend._domainkey.jbbc.co.jp - Added');
            console.log('');
            console.log('Wait 15-30 minutes and run this script again to verify.\n');
          }
        } catch (verifyError: any) {
          console.log('⚠️  Could not verify yet:', verifyError.message);
          console.log('\nThis is normal! DNS propagation takes time.\n');
          console.log('Wait 15-30 minutes and try again.\n');
        }
      }
    } else {
      // Step 2: Add domain
      console.log('📝 Domain not found. Adding jbbc.co.jp to Resend...\n');

      const result = await resend.domains.create({ name: 'jbbc.co.jp' });

      console.log('✅ Domain added successfully!');
      console.log(`   Domain ID: ${result.data?.id}`);
      console.log('');

      console.log('📋 Next Steps:');
      console.log('');
      console.log('1. Go to Digital Ocean DNS settings for jbbc.co.jp');
      console.log('2. Add these DNS records (if not already added):');
      console.log('');
      console.log('   Type: TXT');
      console.log('   Name: resend._domainkey.jbbc.co.jp');
      console.log('   Value: (Resend will provide this - check your Resend dashboard)');
      console.log('');
      console.log('3. Wait 5-30 minutes for DNS propagation');
      console.log('4. Run this script again to verify');
      console.log('');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);

    if (error.message.includes('API key')) {
      console.log('\n⚠️  Make sure RESEND_API_KEY is set in .env.local\n');
    } else if (error.message.includes('already exists')) {
      console.log('\n✅ Domain already exists! Checking status...\n');
      // Retry to get domain info
      const domains = await resend.domains.list();
      const domain = domains.data?.data?.find((d: any) => d.name === 'jbbc.co.jp');
      if (domain) {
        console.log(`Status: ${domain.status}`);
        console.log(`ID: ${domain.id}\n`);
      }
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

setupDomain();
