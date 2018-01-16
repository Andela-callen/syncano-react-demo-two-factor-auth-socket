## Two-factor auth socket demo
A simple web demo that uses two-factor-auth socket in implementing two factor authentication. The demo illustrates scenarios as stated below:

- User Signs up using *rest-auth* socket
- User clicks to set up two factor authentication
- QR code generated and user required to scan with Google Authenticator app
- User inputs token from Google Authenticator app for verification
- If verification successful, two-factor authentication is fully enabled on user account
- User with two-factor auth enabled will be required to input *two-factor token* along with *username* and *password* 
- User with two-factor auth enabled also has the option to disable it but must provide a valid two-factor token for validity check.


### Local Setup
- Clone this repo `git clone git@github.com:Syncano/synacno-react-demo-two-factor-auth-socket.git`
- Move to project repo `cd synacno-react-demo-two-factor-auth-socket`
- Install dependencies `npm install`
- Create a .env file on the root directory. Assign the instance name where two-factor-auth socket attached to the `SYNCANO_INSTANCE`
  e.g `SYNCANO_INSTANCE=abcd`
- Run `npm run buid:dev` to start project

### Demo
[LINK TO DEMO](https://two-factor-authentication--winter-morning-7464.syncano.site)