import GoogleSpreadsheet from 'google-spreadsheet';
import { promisify } from 'es6-promisify';

const creds = {
  type: 'service_account',
  project_id: 'movement-voter-project',
  private_key_id: '50e23613326717c6e483288de664a27339b6518d',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCp4Cy1fqE5XHO2\nZZh8f+BnebMIzhvE53SDeo8KTTXEiEP4gAXg3soczU9LzP4zLG1GMNfAB51zxTZo\noi1IoTUSK6e8qDZ1ZffP+ls9a9L94dzPs3JqrHQDvaM7TUIYhErenZeidxnNd8cP\nqZaSTrTAjKib7+Ma2D1b0j+R1gQH1oshsZouppnl3/ETboVS8YzCEBjcMjwNbO8r\n95wobIlOS+7xYKnewYvAs7cTLygd9otDFGyKMPay/ILPTJvkw7wSoezQ4O3AIkKL\np0+lcFZC00LpAHneg9C3n2tIA9j/+F+/pdSMMJPVLXPJtnh7vOGu8Nmea4aNPavV\nd8TakE4VAgMBAAECggEAA1KxTTOW78pRMSY3n2fY+e01hVySyn1EmDXTin4MKTYJ\nLllCxC1Xgsy5WmA+ML4TvSXDcqwzdkpLUCyr+hm9MgfMljIsLou6F0Vsd30eeXzr\nltyJxnBtLI2PHd/bBSPBWy12A+WUiaJoMHQ+z8neW03lFnfQ13uXZ65rM+0d0xFl\nHexfGRCkMRrtVSWO8vC5tltovKqWZM3HGYv/DRCc41REXtLHCPCVlGQaWOrrqAf/\nkO+4LJX9AkD0srsUo/EljmhNjRD/wVkTXeKcjw6LvRT4VaKBXHyT3R2dLFy4aBBf\nKAqpHQ0K3Bm5arRdh85GO3tzZyr3A4IuPAx03ikDgQKBgQDo7N2VVxZJf9lq13+D\nHvqwJO2htsW3NN4rhMNKseYPZWQU+ZVVKsxX8UEE5Sp6CLp9eLL/EP2/IY6yK0Ia\nyETwQY7V6IdcMNhkO12n77zGTT6mLfYduS1YDUpOmhX9NGbvMeBLI7dyjVPnHaNX\nF3SubsnvwGbqgMUM5SU+bu4h8QKBgQC6tFTQPKhszgoIBD4Q4VvGCFfDaXPlN5Mt\nOSg3sOa8N8BfiokQERalcA+A2kungLxVfdfSDiKGMmJxQKP9gy1sdHKMczkOGIIJ\np1sjlSGhmy4W0aMfPhx96yK7osSRwQdpSFEWcgbtIjEb9mbz1CVyZo4s1sF6aBbT\nNhM9nGGKZQKBgCjLQ0uigv7Aa32w3F5EkLdE4HGQJzSdB8QrbmCoo5hSs6KQy7ys\n0DkewbpvwG67FJ5hA0h021wcLne558v1A03ozXFdVkepLlzvoMmGzVMVuEE2j4JJ\nKk3flgIKLou4H8cIvzWpvblMU0OJB1B7hS3/rVJWKjAr+Vb20v0KRJ6hAoGBAIq3\n85AokWcOCwv7wvWdyycvCa4qCq8TBKoEHqqKKFVOAwO5la63U6Elyo8NIkrY7pWC\ng7kRQXt9sgC9a1qvfS9osbdC4PBlKzDrBF9CrZM6DhtsNQvAhUDVVKAfBnfY+J2z\n2nOX0yebUOuavtGJHS2LnzUXdvdwoQzaz57mMt61AoGAcbMShO1r7/o4Dnv1xBbf\nvF77noVdQDsRQuCatdf8Qar7ulH7oUldLhcIVv+S5mdGAtkW5LdX7pfE/dKbYmaw\nWB2O9u6h1BgLY6/5hISky0mP3j704+S3rgnkQ4+zDRGNJ+VMtSCy1EJX9WPHW6XB\nCH2nWIZbN5DQbnb9wzehX2Y=\n-----END PRIVATE KEY-----\n',
  client_email: 'mvp-site@movement-voter-project.iam.gserviceaccount.com',
  client_id: '103870202756244160950',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/mvp-site%40movement-voter-project.iam.gserviceaccount.com',
};

const sheetId = '1eWAuqoF1DImMXspDA-jBILTqYHw6kQvGMmmWGfRoevw';

const saveToSpreadsheet = (data, handleSuccess, handleError) => {
  const doc = new GoogleSpreadsheet(sheetId);
  // Authenticate with the Google Spreadsheets API.
  doc.useServiceAccountAuth(creds, function(err) {
    err && handleError(err);
    doc.addRow(1, data, function(err) {
      if (err) {
        handleError(err);
      } else {
        handleSuccess();
      }
    });
  });
};

// async function saveToSpreadsheet(fields) {
//   try {
//     const doc = new GoogleSpreadsheet(sheetId);
//     await promisify(doc.useServiceAccountAuth)(creds);
//     const docInfo = await promisify(doc.getInfo)();
//     const sheet = docInfo.worksheets[0];
//     await promisify(sheet.addRow)(fields);
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = saveToSpreadsheet;
