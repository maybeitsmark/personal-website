import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
//import Aos from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

import Navbar from '@/components/Navbar/Navbar';
import Composition from '@/components/Portrait/Composition';

export default function Home() {
  return (
    <div>
      < Navbar isMobile={false} />
          <Composition />
      <h1>Welcome to My Website</h1>
      <p>This is a test page.</p>
    </div >
  );
}