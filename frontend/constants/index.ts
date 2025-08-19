const statusOptions = [
  { value: 'all', label: 'All Tasks' },
  { value: 'Pending', label: 'Pending' },
  { value: 'InProgress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const statusPostOptions = [
  {
    value: 0,
    label: 'Pending',
  },
  {
    value: 1,
    label: 'In Progess',
  },
  {
    value: 2,
    label: 'Completed',
  },
];

export { statusOptions, sortOptions, statusPostOptions };
