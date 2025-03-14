import React from "react";
import {
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import StorageIcon from "@mui/icons-material/Storage";
import UpdateIcon from "@mui/icons-material/Update";
import ThirdPartyIcon from "@mui/icons-material/Groups";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PrintIcon from "@mui/icons-material/Print";
import GetAppIcon from "@mui/icons-material/GetApp";
import PolicyIcon from "@mui/icons-material/Policy";
// import PaymentIcon from "@mui/icons-material/Payment";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CookieIcon from "@mui/icons-material/Cookie";
import LockIcon from "@mui/icons-material/Lock";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const ShopPrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [document.getElementById("privacy-policy-content").innerText],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Lenz_Privacy_Policy.txt";
    document.body.appendChild(element);
    element.click();
  };

  const SectionHeader = ({ icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {icon}
      <Typography
        variant="h6"
        component="strong"
        sx={{
          ml: 1,
          fontWeight: 600,
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: theme.palette.primary.main,
          },
        }}
        id="privacy-policy-content"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <IconButton sx={{ mr: 1 }} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Privacy Policy
              <Chip
                label="Updated Mar 2025"
                size="small"
                color="primary"
                sx={{ ml: 2, verticalAlign: "middle" }}
              />
            </Typography>
          </Box>

          {!isMobile && (
            <Box>
              <Tooltip title="Print">
                <IconButton onClick={handlePrint} aria-label="print">
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download">
                <IconButton onClick={handleDownload} aria-label="download">
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            bgcolor: "rgba(227, 242, 253, 0.5)",
            p: 2,
            borderRadius: 1,
            mb: 4,
          }}
        >
          <Typography variant="body1">
            This Privacy Notice for <strong>Lenz</strong> ("we," "us," or
            "our"), describes how and why we might access, collect, store, use,
            and/or share ( "process" ) your personal information when you use
            our services ( "Services" ), including when you:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            • Visit our website at{" "}
            <Link href="https://lenz-booking.netlify.app/" target="_blank">
              https://lenz-booking.netlify.app/
            </Link>{" "}
            , or any website of ours that links to this Privacy Notice
          </Typography>
          <Typography variant="body1" sx={{ mt: 0 }}>
            • Engage with us in other related ways, including any sales,
            marketing, or events
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Last updated: <strong>March 1, 2025</strong>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Questions or concerns?</strong> Reading this Privacy Notice
            will help you understand your privacy rights and choices. We are
            responsible for making decisions about how your personal information
            is processed. If you do not agree with our policies and practices,
            please do not use our Services. If you still have any questions or
            concerns, please contact us at{" "}
            <Link href="mailto:connect.lenz@gmail.com">
              connect.lenz@gmail.com
            </Link>
          </Typography>
        </Box>

        {/* SUMMARY OF KEY POINTS */}
        <SectionHeader icon={<PolicyIcon />} title="SUMMARY OF KEY POINTS" />

        <Typography variant="body1">
          <strong>
            This summary provides key points from our Privacy Notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our{" "}
            <Link href="#table-of-contents">table of contents</Link> below to
            find the section you are looking for.
          </strong>
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about{" "}
          <Link href="#personal-information">
            personal information you disclose to us
          </Link>
          .
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Do we process any sensitive personal information?</strong>{" "}
          Some of the information may be considered "special" or "sensitive" in
          certain jurisdictions, for example your racial or ethnic origins,
          sexual orientation, and religious beliefs. We may process sensitive
          personal information when necessary with your consent or as otherwise
          permitted by applicable law. Learn more about{" "}
          <Link href="#sensitive-information">
            sensitive information we process
          </Link>
          .
        </Typography>

        {/* Table of Contents */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderLeft: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600 }}
            id="table-of-contents"
          >
            TABLE OF CONTENTS
          </Typography>
          {[
            "What Information Do We Collect?",
            "How Do We Process Your Information?",
            "When And With Whom Do We Share Your Personal Information?",
            "Do We Use Cookies And Other Tracking Technologies?",
            "How Long Do We Keep Your Information?",
            "How Do We Keep Your Information Safe?",
            "Do We Collect Information From Minors?",
            "What Are Your Privacy Rights?",
            "Controls For Do-Not-Track Features",
            "Do We Make Updates To This Notice?",
            "How Can You Contact Us About This Notice?",
            "How Can You Review, Update, Or Delete The Data We Collect From You?",
          ].map((title, index) => (
            <Link
              key={index}
              href={`#section-${index + 1}`}
              sx={{ display: "block", color: "text.primary", py: 0.5 }}
            >
              {index + 1}. {title}
            </Link>
          ))}
        </Box>

        {/* Sections */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-1">
            <SectionHeader
              icon={<DataUsageIcon color="primary" />}
              title="1. What Information Do We Collect?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph id="personal-information">
              <strong>Personal information you disclose to us:</strong> We
              collect personal information that you voluntarily provide when you
              register, express interest in our services, participate in
              activities, or contact us.
            </Typography>
            <Box
              sx={{
                pl: 2,
                borderLeft: `3px solid ${theme.palette.grey[300]}`,
                my: 2,
              }}
            >
              <Typography variant="body1">• Names</Typography>
              <Typography variant="body1">• Phone numbers</Typography>
              <Typography variant="body1">• Email addresses</Typography>
              <Typography variant="body1">• Mailing addresses</Typography>
              <Typography variant="body1">• Passwords</Typography>
              <Typography variant="body1">• Contact preferences</Typography>
              <Typography variant="body1">• Usernames</Typography>
              <Typography variant="body1">• Billing addresses</Typography>
              <Typography variant="body1">
                • Debit/credit card numbers
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              <strong>Sensitive Information:</strong> With your consent, we may
              process bank/card details. Payment data is handled by RazorPay (
              <Link
                href="https://merchant.razorpay.com/policy/Q5DDWrbvqT2SkD/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </Link>
              ).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-2">
            <SectionHeader
              icon={<TrackChangesIcon color="primary" />}
              title="2. How Do We Process Your Information?"
            />
          </AccordionSummary>
          <AccordionDetails id="sensitive-information">
            <Typography variant="body1" paragraph>
              We process your information to:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {[
                "Facilitate account creation and authentication",
                "Deliver services",
                "Respond to inquiries",
                "Send administrative information",
                "Fulfill orders",
                "Enable user communications",
                "Identify usage trends",
              ].map((item) => (
                <li key={item}>
                  <Typography variant="body1">{item}</Typography>
                </li>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-3">
            <SectionHeader
              icon={<ThirdPartyIcon color="primary" />}
              title="3. When And With Whom Do We Share Your Personal Information?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We may share information during business transfers (mergers,
              acquisitions, etc.). We do not collect information from third
              parties.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-4">
            <SectionHeader
              icon={<CookieIcon color="primary" />}
              title="4. Do We Use Cookies And Other Tracking Technologies?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Yes, we use cookies and similar technologies for security,
              preferences, and analytics. Third parties may use them for
              advertising.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-5">
            <SectionHeader
              icon={<StorageIcon color="primary" />}
              title="5. How Long Do We Keep Your Information?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We keep your information for as long as necessary to fulfill the
              purposes outlined in this Privacy Notice, unless otherwise
              required by law. No purpose in this notice will require us to keep
              your personal information for longer than four (4) months past the
              termination of the user's account.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-6">
            <SectionHeader
              icon={<SecurityIcon color="primary" />}
              title="6. How Do We Keep Your Information Safe?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We have implemented appropriate technical and organizational
              security measures to protect your personal information. However,
              no electronic transmission over the Internet or information
              storage technology can be guaranteed to be 100% secure.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-7">
            <SectionHeader
              icon={<ChildCareIcon color="primary" />}
              title="7. Do We Collect Information From Minors?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We do not knowingly collect data from or market to children under
              18 years of age. If we learn that personal information from users
              less than 18 years of age has been collected, we will deactivate
              the account and take reasonable measures to promptly delete such
              data.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-8">
            <SectionHeader
              icon={<PolicyIcon color="primary" />}
              title="8. What Are Your Privacy Rights?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              You may review, change, or terminate your account at any time. You
              can withdraw your consent by contacting us. Most web browsers are
              set to accept cookies by default, but you can choose to remove or
              reject cookies.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-9">
            <SectionHeader
              icon={<TrackChangesIcon color="primary" />}
              title="9. Controls For Do-Not-Track Features"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We do not currently respond to Do-Not-Track browser signals or any
              other mechanism that automatically communicates your choice not to
              be tracked online.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-10">
            <SectionHeader
              icon={<UpdateIcon color="primary" />}
              title="10. Do We Make Updates To This Notice?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Yes, we will update this notice as necessary to stay compliant
              with relevant laws. The updated version will be indicated by an
              updated "Revised" date at the top of this Privacy Notice.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-11">
            <SectionHeader
              icon={<EmailIcon color="primary" />}
              title="11. How Can You Contact Us About This Notice?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              If you have questions or comments about this notice, you may email
              us at{" "}
              <Link href="mailto:connect.lenz@gmail.com">
                connect.lenz@gmail.com
              </Link>{" "}
              or contact us by post at:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Lenz
              <br />
              MG Road, Shalimar
              <br />
              Behind Ramesh Opticians
              <br />
              Nashik, Maharashtra 422001
              <br />
              India
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="section-12">
            <SectionHeader
              icon={<LockIcon color="primary" />}
              title="12. How Can You Review, Update, Or Delete The Data We Collect From You?"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, details about how we have processed it, correct
              inaccuracies, or delete your personal information.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Contact Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: theme.palette.background.default,
            borderRadius: 2,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: isMobile ? 2 : 0 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
            >
              <ContactMailIcon sx={{ mr: 1 }} />
              Contact Us
            </Typography>
            <Typography variant="body1">
              MG Road, Shalimar
              <br />
              Behind Ramesh Opticians
              <br />
              Nashik, Maharashtra 422001
              <br />
              India
              <br />
              Email:{" "}
              <Link href="mailto:connect.lenz@gmail.com">
                connect.lenz@gmail.com
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
            >
              <LockIcon sx={{ mr: 1 }} />
              Data Requests
            </Typography>
            <Typography variant="body1">
              To review, update, or delete your data:
              <br />
              <Link href="#section-12">
                Submit a data subject access request
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShopPrivacyPolicy;
