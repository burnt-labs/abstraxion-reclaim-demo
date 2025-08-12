# Welcome to your Abstaxion x Reclaim Expo App

For more elaborate docs, please visit: https://docs.burnt.com/xion/developers/mobile-app-development/zktls-integration-using-reclaim-in-a-xion-mobile-app

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run ios
   ```

   OR

   ```bash
   npm run android
   ```

## Important Configuration Steps

3. **Configure Reclaim Provider Settings**
   - Set the correct variable name in the Reclaim provider settings
   - This variable name will be used in other parts of the application
   - Make sure to note down the exact variable name as it must match across all configurations

4. **Set Environment Variables**
   - Add the Reclaim provider variable name to your `.env` file
   - This allows the code to use the correct variable when getting the proof from Reclaim
   - Ensure the variable name matches exactly what you set in the Reclaim provider settings

5. **Create RUM Contract on XION**
   - Create a RUM contract with the treasury contract on XION
   - **CRITICAL**: Specify the correct `claim_key` during contract creation
   - The `claim_key` must be the same as the variable name you set in the Reclaim provider
   - This variable name is what will be searched for in the proof response
   - Double-check that all three configurations (Reclaim provider, .env file, and contract claim_key) use the exact same variable name
