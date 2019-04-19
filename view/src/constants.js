export default {
  api: 'http://192.168.11.28:3000/',
  imagePlaceholder: `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`,
};
