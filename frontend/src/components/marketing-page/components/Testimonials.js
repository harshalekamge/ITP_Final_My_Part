import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Sarah Chen" src="/static/images/avatar/1.jpg" />,
    name: 'Sarah Chen',
    occupation: 'Environmental Scientist',
    testimonial:
      "The Plastic Footprint Calculator on GreenCircle.lk completely changed how I view my daily consumption. It's incredibly accurate and eye-opening - I discovered I was using 15% more plastic than I thought. The platform helped me reduce my footprint by 40% in just two months!",
  },
  {
    avatar: <Avatar alt="Marcus Rodriguez" src="/static/images/avatar/2.jpg" />,
    name: 'Marcus Rodriguez',
    occupation: 'Sustainability Consultant',
    testimonial:
      "As a sustainability consultant, I recommend GreenCircle.lk to all my clients. The Recycling Directories feature is a game-changer - it shows exactly where to recycle different materials in your area. The Knowledge Hub has become my go-to resource for environmental education.",
  },
  {
    avatar: <Avatar alt="Emma Thompson" src="/static/images/avatar/3.jpg" />,
    name: 'Emma Thompson',
    occupation: 'Community Organizer',
    testimonial:
      "The Community Forum on GreenCircle.lk has connected me with like-minded environmentalists in my city. We've organized three successful beach cleanups and started a local plastic-free initiative. The platform truly brings people together for a greener future.",
  },
  {
    avatar: <Avatar alt="David Kim" src="/static/images/avatar/4.jpg" />,
    name: 'David Kim',
    occupation: 'Small Business Owner',
    testimonial:
      "GreenCircle.lk's Knowledge Hub helped me transform my restaurant into a plastic-free establishment. The detailed guides on sustainable alternatives and the recycling directory made the transition smooth. My customers love our eco-friendly approach!",
  },
  {
    avatar: <Avatar alt="Lisa Park" src="/static/images/avatar/5.jpg" />,
    name: 'Lisa Park',
    occupation: 'School Teacher',
    testimonial:
      "I use GreenCircle.lk in my classroom to teach students about environmental responsibility. The Plastic Footprint Calculator is perfect for hands-on learning, and the Knowledge Hub provides age-appropriate content. My students are now environmental advocates!",
  },
  {
    avatar: <Avatar alt="James Wilson" src="/static/images/avatar/6.jpg" />,
    name: 'James Wilson',
    occupation: 'City Council Member',
    testimonial:
      "GreenCircle.lk has been instrumental in our city's sustainability initiatives. The platform's data and community insights helped us implement effective recycling programs. The Community Forum keeps us connected with residents who are passionate about environmental protection.",
  },
];

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Discover how GreenCircle.lk is empowering individuals and communities to make sustainable choices. 
          From reducing plastic footprints to organizing environmental initiatives, our users are creating 
          real change. Join thousands of eco-conscious individuals making a difference for our planet.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
