
// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://mawpyfzxvjndiquiytxl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd3B5Znp4dmpuZGlxdWl5dHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTg5NzAsImV4cCI6MjA2NjE5NDk3MH0.nA-8Xg2e88Y0rvcvjLCMJD3XLnWVA9aTX4BY1BMKQfY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to sign up a new user
async function signUpUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing up:', error.message);
        // Additional error handling based on error code
        if (error.code === '23505') {
            console.error('This email is already registered.');
        } else if (error.code === 'signup_disabled') {
            console.error('Sign up is currently disabled.');
        } else if (error.code === 'email_address_invalid') {
            console.error('Invalid email address format.');
        } else if (error.code === 'password_too_short') {
            console.error('Password is too short. Must be at least 6 characters.');
        } else {
            console.error('Database error:', error);
        }
    } else {
        console.log('User signed up successfully:', data.user);
        if (data.user && !data.user.email_confirmed_at) {
            console.log('Please check your email to confirm your account.');
        }
    }
}

// Example usage
const email = 'moustapha.emails@gmail.com'; // Replace with user input
const password = '96756939'; // Replace with user input
signUpUser(email, password);
