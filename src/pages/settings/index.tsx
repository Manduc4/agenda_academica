import { Box, Container, Typography } from '@mui/material';
import { SettingsNotifications } from './settings-notifications';
import { SettingsPassword } from './settings-password';

const Settings: React.FC = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Typography sx={{ mb: 3 }} variant="h4">
        Settings
      </Typography>
      <SettingsNotifications />
      <Box sx={{ pt: 3 }}>
        <SettingsPassword />
      </Box>
    </Container>
  </Box>
);

export default Settings;
