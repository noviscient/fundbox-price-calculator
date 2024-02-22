/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    // require('@tailwindcss/container-queries')
  ],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    fontFamily: {
      'sans': 'Poppins, sans-serif',
      'mono': 'monospace'
    },
    screens: {
      'iphone-5': '320px',
      'iphone-x': '375px',
      'iphone-plus': '414px',
      'tablet-small': '600px',
      'tablet': '768px',
      'tablet-large': '860px',
      'netbook': '960px',
      'desktop': '1024px',
      'desktop-large': '1280px',
      'hd': '1366px',
      'fullhd': '1440px',
      'retina': '1660px'
    },
    colors: {
      transparent: 'transparent',
      current: 'current',
      backgroundcolor: '#f5f7fb',
      neutral: {
        '0': '#ffffff',
        '1': '#fafbfc',
        '2': '#f4f5f7',
        '3': '#ebecf0',
        '4': '#dfe1e6',
        '4-2': '#dfe1e7', // 45
        '5': '#c2c7cf',
        '6': '#b4bac4',
        '6-2': '#97a0af',
        '7': '#98a0ae',
        '8': '#7c8698',
        '8-2': '#5e6c84',
        '9': '#606c82',
        '100': '#7a869a',
        '10': '#44526c',
        '10-2': '#42526e',
        '11': '#283856',
        '11-2': '#253858',
        '12': '#1a2b4b',
        '13': '#0d1f40',
        '14': '#091e42',
        '00': '#000000'
      },
      primary: {
        '1': '#e6e9fd',
        '2': '#b6beee',
        '3': '#8d97d4',
        '4': '#7784d3',
        '5': '#5566ba',
        '6': '#4458a4',
        '7': '#354c8f'
      },
      aqua: {
        '1': '#eafbfe',
        '2': '#c0f3fd',
        '3': '#91e0ef',
        '4': '#56c5e2',
        '5': '#4eb6d5',
        '6': '#45a1bc',
        '7': '#3a8ba3'
      },
      blue: {
        '1': '#e0ebfd',
        '2': '#b8d4fb',
        '3': '#5b9bf8',
        '4': '#3c86f7',
        '5': '#1a69f6',
        '6': '#1555c5',
        '7': '#1649a0'
      },
      green: {
        '1': '#e8fbf0',
        '2': '#bbf2d3',
        '3': '#97eec3',
        '3-2': '#36b37e',
        '4': '#8bd5a7',
        '5': '#5db082',
        '6': '#3a845d',
        '7': '#2a6447'
      },
      yellow: {
        '1': '#fefae8',
        '2': '#fdf0ba',
        '3': '#fbe38e',
        '4': '#f7c544',
        '5': '#f4ad3d',
        '6': '#f29d41',
        '7': '#f19035'
      },
      red: {
        '1': '#fcece7',
        '2': '#f7bfb0',
        '3': '#f1947a',
        '3-2': '#ff7552',
        '4': '#ef7c5c',
        '5': '#ed6440',
        '6': '#ce4425',
        '7': '#b1351a',
      },
      cyan: {
        '1': '#e6e9ff',
        '2': '#b6bdf2',
        '3': '#8d96d9',
        '4': '#7782d9',
        '5': '#5464c0',
        '6': '#4356aa',
        '7': '#324a94',
        '8': '#324a94',
      },
    },
    boxShadow: {
      'SH1': '0 1px 4px -1px rgba(0, 0, 0, 0.11)',
      'SH2': '0 1px 2px -1px rgba(0, 0, 0, 0.11)',
      'SH3': '0 1px 5px -1px rgba(0, 0, 0, 0.15)',
      'SH4': '0 5px 10px -1px rgba(0, 0, 0, 0.12)',
      'SH5': '0 1px 5px 1px rgba(0, 0, 0, 0.24)',
      'SH6': '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
      'SH7': '0 1px 1px 0 rgba(0, 0, 0, 0.1)',
      'SH8': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      'SH9': '0 1px 5px -2px rgba(147, 147, 147, 0.2)',
      'header-navbar': '0px 0px 3px 3px rgba(0, 0, 0, 0.05)',
      'footer': '0px 0px 3px 2px rgba(0, 0, 0, 0.03)',
      'sectioncomponent-toolbar': '0 2px 16px 0 rgba(84, 100, 192, 0.21)',
      'modalcontainer': '0 3px 20px 0 rgba(13, 31, 64, 0.2)',
      'dropdown': '0 3px 20px 0 rgba(13, 31, 64, 0.1)',
      'glow': '0 0 3px 0px rgba(0,0,0,0.11)'
    },
    fontSize: {
      'base': '16px',
      'H8': '8px',
      'H9': '9px',
      'H10': '10px',
      'H11': '11px',
      'H12': '12px',
      'H13': '13px',
      'H14': '14px',
      'H15': '15px',
      'H16': '16px',
      'H17': '17px',
      'H18': '18px',
      'H19': '19px',
      'H20': '20px',
      'H21': '21px',
      'H22': '22px',
      'H24': '24px',
      'H30': '30px',
      'H32': '32px',
    },
    zIndex: {
      '1-movetilesabove': '10001',
      '4-sidebars': '10004',
      '5-footer-above-sidebars': '10005',
      '5-svgpopoverdetector': '10006',
      '6-svgpopover': '10007',
      '30-menu': '10030',
      '30-modalbackdrop': '10030',
      '40-modalcontainer': '10040'
    },
    borderRadius: {
      'none': '0px',
      'sm-4px': '4px',
      'xs-2px': '2px',
      'full': '100%'
    },

    variants: {
      extend: {
        backgroundColor: ['disabled'],
        textColor: ['disabled']
      }
    },

    extend: {
      screens: {
        '2xs': '12rem',
      },
      keyframes: {
        informBg: {
          '50%': { backgroundColor: '#e8fbf0' }
        },
        informPrimaryBg: {
          '50%': { backgroundColor: '#e6e9fd' }
        }
      },
      animation: {
        'inform-primary': 'informPrimaryBg 1.5s ease-in infinite',
        inform: 'informBg 4s linear infinite',
        pulseFast: 'pulse 1s linear infinite',
        spinFast: 'spin 0.5s linear infinite'
      },
      spacing: {
        'containerpadding': '40px',
        'footerheight': '61px',
        'headerheight': '55px',
        'footerpadding': '40px'
      },
      flex: {
        '2-0': '2 0 0px',
      },
      aspectRatio: {
        '1.218': '1.218',
        '2': '2',
        '0.8': '0.8'
      }
    },
  },
}
