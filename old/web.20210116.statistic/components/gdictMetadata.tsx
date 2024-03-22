export default {
  posDisplayMap: [
    {value: 'auto', label: 'Auto'},
    {value: 'acr', label: 'Acronym'},
    {value: 'adj', label: 'Adjective'},
    {value: 'adv', label: 'Adverb'},
    {value: 'conj', label: 'Conjunction'},
    {value: 'expr', label: 'Expression'},
    {value: 'noun', label: 'Noun'},
    {value: 'prep', label: 'Preposition'},
    {value: 'proper noun', label: 'Proper Noun'},
    {value: 'rule', label: 'Rule'},
    {value: 'verb', label: 'Verb'},
    {value: '?', label: 'Unknown'}
  ],
  prioDisplayMap: [
    {value: 1, label: '1 - High Over Rules & Expressions'},
    {value: 2, label: '2 - High Over Expressions'},
    {value: 3, label: '3 - High'},
    {value: 4, label: '4 - Normal'},
    {value: 7, label: '7 - Only if not exists (NFW)'},
    {value: 8, label: '8 - Manual choice only'},
    {value: 9, label: '9 - Inactive'}
  ]
};
