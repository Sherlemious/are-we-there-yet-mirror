export function getPlaceholder(inputField: string) {
  switch (inputField) {
    case 'Mobile Number':
      return '+20 1234542009';
    case 'Years of Experience':
      return '5 years';
    case 'Hotline':
      return '+20 1234542009';
    case 'Link':
      return 'Professional.example.com';
    case 'Name':
      return 'Jane Doe';
    default:
      return 'Enter your ' + inputField;
  }
}
