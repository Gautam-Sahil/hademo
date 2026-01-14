export const products = [
  {
    id: 'PROD-001',
    name: 'Pure Turmeric Powder',
    category: 'Spices & Herbs',
    producer: 'Green Valley Farms',
    status: 'Published',
    lastUpdated: '2024-01-15T14:30:00Z',
    declaredBy: 'John Anderson, Quality Manager',
    declaredDate: '2024-01-10T09:15:00Z',
    evidenceCount: 3,
    versions: [
      { version: '2.0', date: '2024-01-15', status: 'Published', notes: 'Updated certification documents' },
      { version: '1.1', date: '2024-01-05', status: 'Submitted', notes: 'Initial submission with lab results' },
      { version: '1.0', date: '2023-12-20', status: 'Draft', notes: 'Initial draft created' }
    ],
    description:
      'Premium organic turmeric powder, sustainably sourced from family farms in India. Contains 95% curcuminoids.',
    certifications: ['USDA Organic', 'EU Organic', 'Fair Trade']
  },
  {
    id: 'PROD-002',
    name: 'Medical Grade Face Masks',
    category: 'Medical Supplies',
    producer: 'MediSafe Technologies',
    status: 'Submitted',
    lastUpdated: '2024-01-14T11:20:00Z',
    declaredBy: 'Dr. Sarah Chen, Director',
    declaredDate: '2024-01-12T15:45:00Z',
    evidenceCount: 5,
    versions: [
      { version: '1.2', date: '2024-01-14', status: 'Submitted', notes: 'Added compliance documents' },
      { version: '1.1', date: '2024-01-10', status: 'Draft', notes: 'Updated technical specifications' },
      { version: '1.0', date: '2024-01-05', status: 'Draft', notes: 'Initial product entry' }
    ],
    description:
      'Surgical-grade face masks with three-layer construction and high filtration efficiency.',
    certifications: ['FDA Registered', 'CE Declared']
  },
  {
    id: 'PROD-003',
    name: 'Solar Panel Array System',
    category: 'Renewable Energy',
    producer: 'SunPower Solutions',
    status: 'Published',
    lastUpdated: '2024-01-16T09:15:00Z',
    declaredBy: 'Michael Rodriguez, Engineering Lead',
    declaredDate: '2024-01-08T13:20:00Z',
    evidenceCount: 4,
    versions: [
      { version: '3.1', date: '2024-01-16', status: 'Published', notes: 'Updated technical documents' },
      { version: '3.0', date: '2024-01-10', status: 'Published', notes: 'Full disclosure published' },
      { version: '2.0', date: '2023-12-15', status: 'Submitted', notes: 'Specifications update' }
    ],
    description:
      'High-efficiency monocrystalline solar panel system for industrial and commercial use.',
    certifications: ['IEC 61215', 'IEC 61730']
  },
  {
    id: 'PROD-004',
    name: 'Pharmaceutical Grade Hand Sanitizer',
    category: 'Healthcare',
    producer: 'PureGuard Laboratories',
    status: 'Draft',
    lastUpdated: '2024-01-13T16:45:00Z',
    declaredBy: 'Lisa Thompson, R&D Manager',
    declaredDate: '2024-01-13T16:45:00Z',
    evidenceCount: 2,
    versions: [
      { version: '1.0', date: '2024-01-13', status: 'Draft', notes: 'Initial formulation disclosure' }
    ],
    description:
      'Ethanol-based hand sanitizer formulated according to WHO guidance.',
    certifications: ['WHO Formulation']
  },
  {
    id: 'PROD-005',
    name: 'Industrial Water Purification Unit',
    category: 'Industrial Equipment',
    producer: 'AquaPure Systems',
    status: 'Published',
    lastUpdated: '2024-01-17T10:30:00Z',
    declaredBy: 'David Wilson, Technical Director',
    declaredDate: '2024-01-05T14:15:00Z',
    evidenceCount: 6,
    versions: [
      { version: '4.2', date: '2024-01-17', status: 'Published', notes: 'Updated system documentation' },
      { version: '4.1', date: '2024-01-12', status: 'Published', notes: 'Installation guidance added' },
      { version: '4.0', date: '2024-01-03', status: 'Submitted', notes: 'Technical disclosure' }
    ],
    description:
      'Reverse osmosis water purification system with automated monitoring.',
    certifications: ['NSF/ANSI 61', 'ISO 9001']
  },
  {
    id: 'PROD-006',
    name: 'Emergency First Aid Kits',
    category: 'Medical Supplies',
    producer: 'FirstResponse Inc.',
    status: 'Submitted',
    lastUpdated: '2024-01-14T08:20:00Z',
    declaredBy: 'Robert Kim, Compliance Officer',
    declaredDate: '2024-01-12T11:30:00Z',
    evidenceCount: 3,
    versions: [
      { version: '2.1', date: '2024-01-14', status: 'Submitted', notes: 'Updated component list' },
      { version: '2.0', date: '2024-01-08', status: 'Draft', notes: 'Expanded kit contents' },
      { version: '1.0', date: '2023-12-20', status: 'Draft', notes: 'Initial specification' }
    ],
    description:
      'Comprehensive first aid kits for workplace and emergency use.',
    certifications: ['OSHA Declared', 'FDA Registered']
  },
   {
    id: 'PROD-007',
    name: 'Eco-Friendly Laundry Detergent',
    category: 'Household Supplies',
    producer: 'GreenClean Co.',
    status: 'Published',
    lastUpdated: '2024-01-18T12:45:00Z',
    declaredBy: 'Emma Lewis, Product Manager',
    declaredDate: '2024-01-10T10:00:00Z',
    evidenceCount: 4,
    versions: [
      { version: '2.0', date: '2024-01-18', status: 'Published', notes: 'Added eco-certifications' },
      { version: '1.5', date: '2024-01-12', status: 'Submitted', notes: 'Improved formula documentation' },
      { version: '1.0', date: '2024-01-05', status: 'Draft', notes: 'Initial product draft' }
    ],
    description:
      'Plant-based laundry detergent, biodegradable and phosphate-free, suitable for sensitive skin.',
    certifications: ['USDA Organic', 'EcoLabel', 'Vegan']
  },
  {
    id: 'PROD-008',
    name: 'Smart Thermostat X200',
    category: 'Home Automation',
    producer: 'HomeSmart Solutions',
    status: 'Submitted',
    lastUpdated: '2024-01-19T09:30:00Z',
    declaredBy: 'Liam Carter, CTO',
    declaredDate: '2024-01-15T14:20:00Z',
    evidenceCount: 5,
    versions: [
      { version: '3.0', date: '2024-01-19', status: 'Submitted', notes: 'Added energy usage report' },
      { version: '2.5', date: '2024-01-15', status: 'Draft', notes: 'Firmware update documents' },
      { version: '2.0', date: '2024-01-10', status: 'Draft', notes: 'Initial design draft' }
    ],
    description:
      'Wi-Fi enabled smart thermostat with AI-driven energy saving and remote control via mobile app.',
    certifications: ['Energy Star', 'FCC Compliant']
  },
  {
    id: 'PROD-009',
    name: 'High-Performance Electric Bicycle',
    category: 'Transportation',
    producer: 'EcoRide Motors',
    status: 'Draft',
    lastUpdated: '2024-01-20T11:10:00Z',
    declaredBy: 'Sophia Martinez, Lead Engineer',
    declaredDate: '2024-01-18T08:50:00Z',
    evidenceCount: 2,
    versions: [
      { version: '1.0', date: '2024-01-20', status: 'Draft', notes: 'Prototype specifications disclosed' }
    ],
    description:
      'Lightweight electric bicycle with 80 km range, pedal-assist mode, and regenerative braking system.',
    certifications: ['CE Declared', 'UL Certified']
  }
];

export default products