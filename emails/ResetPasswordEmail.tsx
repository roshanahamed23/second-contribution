import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
  }
  
  export default function ResetPasswordEmail({ username}: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Reset Password Email</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here&apos;s your reset password email</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              Thank you for contacting us. Please use the following link to reset your password!
            </Text>
          </Row>
          <Row>
            <Text>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          { <Row>
            <Button
              href={`${process.env.DOMAIN}/reset-password/${username}`}
              style={{ color: '#61dafb' }}
            >
              Reset here
            </Button>
          </Row> }
        </Section>
      </Html>
    );
  }