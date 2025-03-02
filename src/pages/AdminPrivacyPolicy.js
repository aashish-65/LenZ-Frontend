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
  Tooltip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import StorageIcon from '@mui/icons-material/Storage';
import UpdateIcon from '@mui/icons-material/Update';
import ThirdPartyIcon from '@mui/icons-material/Groups';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import GetAppIcon from '@mui/icons-material/GetApp';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
    element.download = "LenZ_Privacy_Policy.txt";
    document.body.appendChild(element);
    element.click();
  };

  const SectionHeader = ({ icon, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {icon}
      <Typography 
        variant="h6" 
        component="strong" 
        sx={{ 
          ml: 1,
          fontWeight: 600,
          color: theme.palette.primary.main 
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
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: theme.palette.primary.main
          }
        }}
        id="privacy-policy-content"
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3 
        }}>
          <Box>
            <IconButton 
              sx={{ mr: 1 }}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
            
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Privacy Policy
              <Chip 
                label="Updated Mar 2025" 
                size="small" 
                color="primary" 
                sx={{ ml: 2, verticalAlign: 'middle' }} 
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
            bgcolor: 'rgba(227, 242, 253, 0.5)', 
            p: 2, 
            borderRadius: 1,
            mb: 4
          }}
        >
          <Typography variant="body1">
            This privacy policy applies to the <strong>LenZ Admin</strong> app for mobile devices created by <strong>Vivek Ghosh</strong> as a Free service. 
            Last updated: <strong>March 1, 2025</strong>
          </Typography>
        </Box>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="information-collection-content"
            id="information-collection-header"
          >
            <SectionHeader 
              icon={<DataUsageIcon color="primary" />} 
              title="Information Collection and Use" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The Application collects information when you download and use it. This information may include:
            </Typography>
            <Box sx={{ 
              pl: 2, 
              borderLeft: `3px solid ${theme.palette.grey[300]}`,
              my: 2
            }}>
              <Typography variant="body1" sx={{ py: 0.5 }}>• Your device's Internet Protocol address (e.g. IP address)</Typography>
              <Typography variant="body1" sx={{ py: 0.5 }}>• The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</Typography>
              <Typography variant="body1" sx={{ py: 0.5 }}>• The time spent on the Application</Typography>
              <Typography variant="body1" sx={{ py: 0.5 }}>• The operating system you use on your mobile device</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              The Application does not gather precise information about the location of your mobile device.
            </Typography>
            <Typography variant="body1">
              The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices, and marketing promotions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="third-party-content"
            id="third-party-header"
          >
            <SectionHeader 
              icon={<ThirdPartyIcon color="primary" />} 
              title="Third Party Access" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
            </Typography>
            <Typography variant="body1" paragraph>
              Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
            </Typography>
            <Box sx={{ 
              bgcolor: theme.palette.background.default, 
              borderRadius: 1,
              p: 2,
              my: 2
            }}>
              <Link href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer" sx={{ display: 'block', py: 1 }}>
                Google Play Services
              </Link>
              <Link href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" sx={{ display: 'block', py: 1 }}>
                Google Analytics for Firebase
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="opt-out-content"
            id="opt-out-header"
          >
            <SectionHeader 
              icon={<UpdateIcon color="primary" />} 
              title="Opt-Out Rights" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="data-retention-content"
            id="data-retention-header"
          >
            <SectionHeader 
              icon={<StorageIcon color="primary" />} 
              title="Data Retention Policy" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at{" "}
              <Link href="mailto:connect.lenz@gmail.com">connect.lenz@gmail.com</Link> and they will respond in a reasonable time.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="children-content"
            id="children-header"
          >
            <SectionHeader 
              icon={<ChildCareIcon color="primary" />} 
              title="Children" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
            </Typography>
            <Typography variant="body1">
              The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discovers that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider at{" "}
              <Link href="mailto:connect.lenz@gmail.com">connect.lenz@gmail.com</Link> so that they will be able to take the necessary actions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="security-content"
            id="security-header"
          >
            <SectionHeader 
              icon={<SecurityIcon color="primary" />} 
              title="Security" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="changes-content"
            id="changes-header"
          >
            <SectionHeader 
              icon={<UpdateIcon color="primary" />} 
              title="Changes" 
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
            </Typography>
            <Typography variant="body1">
              This privacy policy is effective as of 2025-03-01.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="strong" gutterBottom sx={{ fontWeight: 600 }}>
            Your Consent
          </Typography>
          <Typography variant="body1" paragraph>
            By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
          </Typography>
        </Box>

        <Box 
          sx={{ 
            mt: 4, 
            p: 3, 
            bgcolor: theme.palette.background.default, 
            borderRadius: 2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between' 
          }}
        >
          <Box sx={{ mb: isMobile ? 2 : 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              Contact Us
            </Typography>
            <Typography variant="body1">
              If you have any questions regarding privacy while using the Application, please contact:
            </Typography>
            <Link 
              href="mailto:connect.lenz@gmail.com" 
              sx={{ 
                display: 'inline-block', 
                mt: 1,
                fontWeight: 500
              }}
            >
              connect.lenz@gmail.com
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;