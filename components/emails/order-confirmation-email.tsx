import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { format } from "date-fns"

interface OrderConfirmationEmailProps {
  order: {
    id: string
    orderNumber: string
    customerName: string
    customerEmail: string
    tourName: string
    tourImage: string
    tourLocation: string
    tourDate: Date
    tourTime: string
    numberOfPeople: number
    duration: number
    totalAmount: number
    bookingDate: Date
    specialRequests?: string
  }
}

export const OrderConfirmationEmail = ({ order }: OrderConfirmationEmailProps) => {
  const formattedTourDate = format(new Date(order.tourDate), "EEEE, MMMM d, yyyy")
  const formattedBookingDate = format(new Date(order.bookingDate), "MMMM d, yyyy")
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  return (
    <Html>
      <Head />
      <Preview>Your tour booking confirmation #{order.orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src="/images/loggo.png" width="120" height="40" alt="Rwoma Tours Logo" style={logo} />
          </Section>

          <Section style={headerSection}>
            <Heading style={heading}>Booking Confirmation</Heading>
            <Text style={orderNumberText}>Order #{order.orderNumber}</Text>
          </Section>

          <Section style={section}>
            <Text style={thankYouText}>Thank you for your booking, {order.customerName}!</Text>
            <Text style={confirmationText}>Your tour has been confirmed. We're excited to have you join us!</Text>
          </Section>

          <Hr style={divider} />

          <Section style={tourSection}>
            <Heading as="h2" style={subheading}>
              Tour Details
            </Heading>

            <Row>
              <Column>
                <Img src={order.tourImage} width="200" height="150" alt={order.tourName} style={tourImage} />
              </Column>
              <Column>
                <Text style={tourName}>{order.tourName}</Text>
                <Text style={tourDetail}>
                  <strong>Location:</strong> {order.tourLocation}
                </Text>
                <Text style={tourDetail}>
                  <strong>Date:</strong> {formattedTourDate}
                </Text>
                <Text style={tourDetail}>
                  <strong>Time:</strong> {order.tourTime}
                </Text>
                <Text style={tourDetail}>
                  <strong>Duration:</strong> {order.duration} {order.duration === 1 ? "day" : "days"}
                </Text>
                <Text style={tourDetail}>
                  <strong>Guests:</strong> {order.numberOfPeople}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Payment Summary
            </Heading>
            <Row>
              <Column>
                <Text style={paymentDetail}>
                  Tour Price ({order.numberOfPeople} {order.numberOfPeople === 1 ? "person" : "people"})
                </Text>
              </Column>
              <Column align="right">
                <Text style={paymentAmount}>UGX {order.totalAmount.toLocaleString()}</Text>
              </Column>
            </Row>
            <Hr style={divider} />
            <Row>
              <Column>
                <Text style={totalText}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={totalAmount}>UGX {order.totalAmount.toLocaleString()}</Text>
              </Column>
            </Row>
          </Section>

          {order.specialRequests && (
            <Section style={section}>
              <Heading as="h2" style={subheading}>
                Special Requests
              </Heading>
              <Text style={specialRequestsText}>{order.specialRequests}</Text>
            </Section>
          )}

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Important Information
            </Heading>
            <Text style={infoText}>• Please arrive 15 minutes before the scheduled tour time.</Text>
            <Text style={infoText}>• Don't forget to bring comfortable walking shoes, a hat, and sunscreen.</Text>
            <Text style={infoText}>• Free cancellation up to 24 hours before the experience starts.</Text>
          </Section>

          <Section style={ctaSection}>
            <Link href={`${baseUrl}/dashboard/bookings/${order.id}`} style={viewOrderButton}>
              View Your Booking
            </Link>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footerText}>If you have any questions, please contact us at support@rwoma.com</Text>
            <Text style={footerText}>© {new Date().getFullYear()} Rwoma Tours. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
}

const logoContainer = {
  padding: "20px",
  backgroundColor: "#ffffff",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  textAlign: "center" as const,
}

const logo = {
  margin: "0 auto",
}

const headerSection = {
  padding: "30px 20px",
  backgroundColor: "#22c55e",
  borderRadius: "4px",
  textAlign: "center" as const,
  color: "#ffffff",
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  color: "#ffffff",
}

const orderNumberText = {
  fontSize: "16px",
  color: "#ffffff",
  margin: "10px 0 0",
}

const section = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "4px",
  marginTop: "20px",
}

const thankYouText = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 10px",
}

const confirmationText = {
  fontSize: "16px",
  margin: "0",
  color: "#4b5563",
}

const divider = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
}

const tourSection = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "4px",
  marginTop: "20px",
}

const subheading = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
  color: "#111827",
}

const tourImage = {
  borderRadius: "4px",
  marginBottom: "10px",
}

const tourName = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 10px",
}

const tourDetail = {
  fontSize: "14px",
  margin: "0 0 5px",
  color: "#4b5563",
}

const paymentDetail = {
  fontSize: "14px",
  margin: "0",
  color: "#4b5563",
}

const paymentAmount = {
  fontSize: "14px",
  margin: "0",
  color: "#4b5563",
}

const totalText = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
}

const totalAmount = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
  color: "#22c55e",
}

const specialRequestsText = {
  fontSize: "14px",
  margin: "0",
  color: "#4b5563",
  fontStyle: "italic",
}

const infoText = {
  fontSize: "14px",
  margin: "0 0 10px",
  color: "#4b5563",
}

const ctaSection = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "4px",
  marginTop: "20px",
  textAlign: "center" as const,
}

const viewOrderButton = {
  backgroundColor: "#22c55e",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: "bold",
  display: "inline-block",
}

const footerSection = {
  padding: "20px",
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "5px 0",
}
