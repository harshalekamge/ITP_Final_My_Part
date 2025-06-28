import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CalculateIcon from '@mui/icons-material/Calculate';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';

const items = [
  {
    icon: <CalculateIcon />,
    title: 'Plastic Footprint Calculator',
    description:
      'Track and analyze your daily plastic consumption with our advanced calculator. Get personalized insights and recommendations to reduce your environmental impact. Monitor your progress over time and see the real difference you\'re making for the planet.',
    imageLight: `url('https://i.pinimg.com/736x/68/aa/bd/68aabd5263ebfac6c88ab1df65062c71.jpg')`,
    imageDark: `url('https://i.pinimg.com/736x/68/aa/bd/68aabd5263ebfac6c88ab1df65062c71.jpg')`,
    customStyle: {
      backgroundSize: '120%',
      backgroundPosition: 'center',
    },
  },
  {
    icon: <RecyclingIcon />,
    title: 'Recycling Directories',
    description:
      'Find recycling centers, drop-off locations, and waste management facilities near you. Our comprehensive directory covers all types of materials - from plastics and paper to electronics and hazardous waste. Get detailed information about what each facility accepts.',
    imageLight: `url('https://i.pinimg.com/736x/3f/c8/5c/3fc85cc3db55fe5ef0ddc0e44e0fd64c.jpg')`,
    imageDark: `url('https://i.pinimg.com/736x/3f/c8/5c/3fc85cc3db55fe5ef0ddc0e44e0fd64c.jpg')`,
  },
  {
    icon: <SchoolIcon />,
    title: 'Knowledge Hub',
    description:
      'Access a wealth of educational resources about environmental protection, sustainable living, and plastic pollution. From beginner guides to advanced research, our Knowledge Hub provides reliable information to help you make informed environmental decisions.',
    imageLight: `url('https://i.pinimg.com/736x/b7/1a/61/b71a615fb8f64799e7835456070e6f26.jpg')`,
    imageDark: `url('https://i.pinimg.com/736x/b7/1a/61/b71a615fb8f64799e7835456070e6f26.jpg')`,
    customStyle: {
      backgroundSize: '120%',
      backgroundPosition: 'center',
    },
  },
  {
    icon: <ForumIcon />,
    title: 'Community Forum',
    description:
      'Connect with like-minded environmentalists, share experiences, and collaborate on sustainability projects. Our Community Forum brings together individuals, organizations, and experts to discuss environmental challenges and solutions. Join local initiatives and global conversations.',
    imageLight: `url('https://i.pinimg.com/736x/10/23/cf/1023cfdaa0635dd71e47b333e2eaf8bd.jpg')`,
    imageDark: `url('https://i.pinimg.com/736x/10/23/cf/1023cfdaa0635dd71e47b333e2eaf8bd.jpg')`,
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: (theme.vars || theme).palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={(theme) => ({
            mb: 2,
            backgroundSize: items[selectedItemIndex]?.customStyle?.backgroundSize || 'cover',
            backgroundPosition: items[selectedItemIndex]?.customStyle?.backgroundPosition || 'center',
            minHeight: 280,
            backgroundImage: 'var(--items-imageLight)',
            ...theme.applyStyles('dark', {
              backgroundImage: 'var(--items-imageDark)',
            }),
          })}
          style={
            items[selectedItemIndex]
              ? {
                  '--items-imageLight': items[selectedItemIndex].imageLight,
                  '--items-imageDark': items[selectedItemIndex].imageDark,
                }
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    imageDark: PropTypes.string.isRequired,
    imageLight: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Platform Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Discover the powerful tools and resources that make GreenCircle.lk your complete environmental platform. 
          From tracking your impact to connecting with communities, our features empower you to make sustainable 
          choices and create positive environmental change.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={(theme) => ({
                width: '100%',
                height: '100%',
                backgroundSize: items[selectedItemIndex]?.customStyle?.backgroundSize || 'cover',
                backgroundPosition: items[selectedItemIndex]?.customStyle?.backgroundPosition || 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)',
                }),
              })}
              style={
                items[selectedItemIndex]
                  ? {
                      '--items-imageLight': items[selectedItemIndex].imageLight,
                      '--items-imageDark': items[selectedItemIndex].imageDark,
                    }
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
