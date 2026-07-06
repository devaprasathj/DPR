# Login Instructions for MDONER DPR System

## Demo Credentials

The system has been configured with demo accounts for testing:

### Primary Demo Account
- **Email:** `demo@mdoner.gov.in`
- **Password:** `demo123`

### Admin Demo Account
- **Email:** `admin@mdoner.gov.in`  
- **Password:** `admin123`

## How to Login

1. Open `login page.html` in your web browser
2. Enter one of the demo credentials above
3. Click "Sign In"
4. You should see "Login successful. Redirecting..." message
5. The page will automatically redirect to the main dashboard

## Troubleshooting

If the login is not working, follow these steps:

### Step 1: Open Browser Developer Console
- **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I`
- **Firefox:** Press `F12` or `Ctrl+Shift+K`
- Go to the "Console" tab

### Step 2: Check for Errors
Look for any red error messages in the console. Common issues:

1. **JavaScript files not loading**
   - Check if `Autrhentication login.js` and `language-switcher.js` are in the same folder
   - Look for 404 errors in the console

2. **Form not submitting**
   - You should see console messages like "Login form submitted" when you click Sign In
   - If you don't see these messages, the form event listener is not attached

3. **LocalStorage issues**
   - Go to the "Application" or "Storage" tab in developer tools
   - Check "Local Storage" → your domain
   - You should see `dpr_users` with the demo accounts
   - You should see `dpr_token` after successful login

### Step 3: Clear Browser Cache
If the old code is cached:
1. Press `Ctrl+Shift+Delete`
2. Select "Cached images and files"
3. Also clear "Cookies and other site data"
4. Reload the page with `Ctrl+F5`

### Step 4: Manual Account Creation
If demo accounts are not created automatically, open the browser console on the login page and run:

```javascript
const users = { 
    'demo@mdoner.gov.in': 'demo123',
    'admin@mdoner.gov.in': 'admin123'
};
localStorage.setItem('dpr_users', JSON.stringify(users));
console.log('Demo accounts created manually');
```

Then try logging in again.

### Step 5: Check Console Logs
When you submit the login form, you should see these console messages:
- "Authentication script loaded"
- "Login form found: true"
- "Demo accounts created..." (first time only)
- "Login form submitted"
- "Email: [your email]"
- "Stored users: [array of emails]"
- "Authentication successful"
- "Redirecting to dashboard..."

## Manual Testing Checklist

- [ ] Login page loads without errors
- [ ] Demo credentials are displayed on the login page
- [ ] Form fields accept input
- [ ] Submit button is clickable
- [ ] Error message displays for wrong credentials
- [ ] Success message displays for correct credentials
- [ ] Page redirects to dashboard after successful login
- [ ] Dashboard displays and doesn't redirect back to login
- [ ] Logout button works and returns to login page

## File Structure Check

Ensure these files exist in the same folder:
- `login page.html`
- `main dashboard.html`
- `Autrhentication login.js`
- `language-switcher.js`
- `style and login page.css`
- `dashboard.css`

All HTML files should reference these scripts correctly.
