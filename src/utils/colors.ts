/* eslint-disable camelcase */
interface IThemeColors {
  light: {
    header: {
      title: string;
      nav: {
        item: {
          color: string;
        };
      };
    };
  };
}

const themeColors = {
  light: {
    header: {
      title: '#555756',
      nav: {
        item: {
          color: '#555756',
        },
      },
    },
  },
} as IThemeColors;

// 8900FA, 8038BB, 5F00AD, AB4BFA, 43007A

export default themeColors;
