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
  List,
  ListItem,
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

const PrivacyPolicy = () => {
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
    element.download = "LenZ_Delivery_Privacy_Policy.txt";
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
            This privacy policy applies to the LenZ Delivery app (hereby
            referred to as "Application") for mobile devices created by Vivek
            Ghosh (hereby referred to as "Service Provider") as a Free service.
            This service is intended for use "AS IS".
          </Typography>
        </Box>

        {/* Information Collection and Use */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<DataUsageIcon color="primary" />}
              title="Information Collection and Use"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The Application collects information when you download and use it.
              This information may include:
            </Typography>
            <List sx={{ pl: 2, listStyleType: "disc", marginLeft: "20px" }}>
              {[
                "Your device's Internet Protocol address (e.g. IP address)",
                "The pages of the Application that you visit, the time and date of your visit, the time spent on those pages",
                "The time spent on the Application",
                "The operating system you use on your mobile device",
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "list-item", p: 0, pl: 1 }}
                >
                  <Typography variant="body1">{item}</Typography>
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              The Application does not gather precise information about the
              location of your mobile device.
            </Typography>
            <Typography variant="body1" paragraph>
              The Service Provider may use the information you provided to
              contact you from time to time to provide you with important
              information, required notices, and marketing promotions.
            </Typography>
            <Typography variant="body1" paragraph>
              For a better experience, while using the Application, the Service
              Provider may require you to provide us with certain personally
              identifiable information, including but not limited to Name,
              Phone, Email, Vehicle Number. The information that the Service
              Provider request will be retained by them and used as described in
              this privacy policy.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Third Party Access */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<ThirdPartyIcon color="primary" />}
              title="Third Party Access"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Only aggregated, anonymized data is periodically transmitted to
              external services to aid the Service Provider in improving the
              Application and their service. The Service Provider may share your
              information with third parties in the ways that are described in
              this privacy statement.
            </Typography>
            <Typography variant="body1" paragraph>
              Please note that the Application utilizes third-party services
              that have their own Privacy Policy about handling data. Below are
              the links to the Privacy Policy of the third-party service
              providers used by the Application:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Link
                href="https://www.google.com/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play Services
              </Link>
              <br />
              <Link
                href="https://firebase.google.com/support/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firebase Crashlytics
              </Link>
            </Box>
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              The Service Provider may disclose User Provided and Automatically
              Collected Information:
            </Typography>
            <List sx={{ pl: 2, listStyleType: "disc", marginLeft: "20px" }}>
              {[
                "as required by law, such as to comply with a subpoena, or similar legal process;",
                "when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;",
                "with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.",
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "list-item", p: 0, pl: 1 }}
                >
                  <Typography variant="body1">{item}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Opt-Out Rights */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<PolicyIcon color="primary" />}
              title="Opt-Out Rights"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              You can stop all collection of information by the Application
              easily by uninstalling it. You may use the standard uninstall
              processes as may be available as part of your mobile device or via
              the mobile application marketplace or network.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Data Retention Policy */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<StorageIcon color="primary" />}
              title="Data Retention Policy"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The Service Provider will retain User Provided data for as long as
              you use the Application and for a reasonable time thereafter. If
              you'd like them to delete User Provided Data that you have
              provided via the Application, please contact them at{" "}
              <Link href="mailto:connect.lenz@gmail.com">
                connect.lenz@gmail.com
              </Link>{" "}
              and they will respond in a reasonable time.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Children */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<ChildCareIcon color="primary" />}
              title="Children"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The Service Provider does not use the Application to knowingly
              solicit data from or market to children under the age of 13.
            </Typography>
            <Typography variant="body1">
              The Application does not address anyone under the age of 13. The
              Service Provider does not knowingly collect personally
              identifiable information from children under 13 years of age. In
              the case the Service Provider discovers that a child under 13 has
              provided personal information, the Service Provider will
              immediately delete this from their servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact the Service Provider at{" "}
              <Link href="mailto:connect.lenz@gmail.com">
                connect.lenz@gmail.com
              </Link>{" "}
              so that they will be able to take the necessary actions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Security */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<SecurityIcon color="primary" />}
              title="Security"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The Service Provider is concerned about safeguarding the
              confidentiality of your information. The Service Provider provides
              physical, electronic, and procedural safeguards to protect
              information the Service Provider processes and maintains.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Changes */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <SectionHeader
              icon={<UpdateIcon color="primary" />}
              title="Changes"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This Privacy Policy may be updated from time to time for any
              reason. The Service Provider will notify you of any changes to the
              Privacy Policy by updating this page with the new Privacy Policy.
              You are advised to consult this Privacy Policy regularly for any
              changes, as continued use is deemed approval of all changes.
            </Typography>
            <Typography variant="body1">
              This privacy policy is effective as of 2025-03-01.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Your Consent */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            component="strong"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Your Consent
          </Typography>
          <Typography variant="body1" paragraph>
            By using the Application, you are consenting to the processing of
            your information as set forth in this Privacy Policy now and as
            amended by us.
          </Typography>
        </Box>

        {/* Contact Us */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: theme.palette.background.default,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            <EmailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions regarding privacy while using the
            Application, please contact us at{" "}
            <Link href="mailto:connect.lenz@gmail.com">
              connect.lenz@gmail.com
            </Link>
            .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
