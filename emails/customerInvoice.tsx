import { getVariablePrice } from "@/lib/utils";
import { format } from "date-fns";
import { Order, OrderItem } from "@/types";
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

import * as React from "react";

interface CustomerInvoiceEmailProps {
  order: Order
}

export default function CustomerInvoiceEmail({order}: CustomerInvoiceEmailProps) {
  var total: number = 0;
  
  const orderItemComponents: React.JSX.Element[] = [];

  order.orderItems.forEach((oi) => {
    const variablePricingIds = oi.product.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 
    const itemPrice = oi.product.pricingMatrix ? getVariablePrice(oi.selectedVariants as any, oi.product.pricingMatrix, variablePricingIds) ?? oi.product.price : oi.product.price
    const unitPrice = Number(itemPrice)
    const orderTotal = unitPrice * oi.quantity

    orderItemComponents.push(<OrderItem key={oi.id} orderItem={oi} itemPrice={unitPrice}/>)

    total += orderTotal;
  })

  
  return (
    <Html>
    <Head />
    <Preview>You got an order</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Img
                src={'/assets/logo.png'}
                width="80"
                alt="Logo"
              />
            </Column>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Order Received</Text>
            </Column>
          </Row>
        </Section>
        <Section style={informationTable}>
          <Row style={informationTableRow}>
            <Column colSpan={2}>
              <Section>
                <Row>
                <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {order.id}
                    </Link>
                  </Column>
                </Row>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER DATE</Text>
                    <Text style={informationTableValue}>{format(order.createdAt, "dd MMMM yyyy")}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>EMAIL</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {order.email}
                    </Link>
                  </Column>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>NAME</Text>
                    <Text style={informationTableValue}>{order.name}</Text>
                  </Column>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>PHONE</Text>
                    <Text style={informationTableValue}>{order.phone}</Text>
                  </Column>
                </Row>
              </Section>  
            </Column>
            <Column style={informationTableColumn} colSpan={2}>
              <Text style={informationTableLabel}>DELIVER TO</Text>
              {
                order.address.split(",").map((t) => <Text key={t} style={informationTableValue}>{t}</Text>)
              }
            </Column>
          </Row>
        </Section>
        <Section style={productTitleTable}>
          <Text style={productsTitle}>Summary</Text>
        </Section>
        <Section>
          {orderItemComponents}
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>{order.isLocalPickUp ? "Local Pick Up": "Shipping"}</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>${Number(order.shipping).toFixed(2)}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>Total</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>${total.toFixed(2)}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLineBottom} />
        <Text style={footerTextCenter}>
          Thank you for your order!
        </Text>
        <Text style={footerTextCenter}>
          Do you have any questions, returns, or exchanges regarding your purchase?{" "}
          <Link
            href="https://decormyhouse.com.au/"
            style={footerLink}
          >
            Let us know.
          </Link>
        </Text>
        <Section>
          <Row>
            <Column align="center" style={footerIcon}>
              <Img
                src={'/assets/logo.png'}
                width="64"
                height="64"
                alt="Logo"
              />
            </Column>
          </Row>
        </Section>
        <Text style={footerLinksWrapper}>
          <Link href="https://decormyhouse.com.au/">
            Terms of Use
          </Link>{" "}
          •{" "}
          <Link href="https://decormyhouse.com.au/">
            Privacy Policy{" "}
          </Link>
        </Text>
        <Text style={footerCopyright}>
          Copyright © 2024 Decor My House. <br />{" "}
          <Link href="https://decormyhouse.com.au/">All rights reserved</Link>
        </Text>
      </Container>
    </Body>
  </Html>)
}

const main = {
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "20px",
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productPriceTotal = {
  margin: "0",
  fontSize: "12px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "middle",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 64px 0" };

const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center" as const,
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

interface OrderItemProps {
  orderItem: OrderItem
  itemPrice: number
}

function OrderItem({orderItem, itemPrice }: OrderItemProps) {
  return (
    <Section>
      <Row>
        <Column style={{ width: "64px" }}>
          <Img
            style={productIcon}
            src={orderItem.product.images[0].url}
            width="100"
            height="100"
            className='mx-4'
            alt={orderItem.product.name}
          />
        </Column>
        {/* Name and Variants */}
        <Column style={{ paddingLeft: "32px" }}>
          <Text style={productTitle}>{orderItem.product.name} <span>{"x" + orderItem.quantity}</span></Text>
          <Column>
            {orderItem.product.variants.map((v) => {
            const valueJsons = orderItem.selectedVariants ? orderItem.selectedVariants : null;
            const val = valueJsons ? valueJsons[v.id] : ""
            return <Text style={productDescription} key={v.id}>
                {`${v.name}: ${val}`}
              </Text>})}
          </Column>
        </Column>
        {/* Amount */}
        <Column style={productPriceWrapper} align="right">
          <Text style={productPrice}>${itemPrice.toFixed(2)}</Text>
        </Column>
      </Row>
    </Section>
  )
}
