# Design System - Component Examples

Practical code examples showing how to use the design system in your Next.js portfolio.

## 📋 Table of Contents

1. [Buttons](#buttons)
2. [Forms](#forms)
3. [Cards](#cards)
4. [Layouts](#layouts)
5. [Typography](#typography)
6. [Colors](#colors)
7. [Responsive Grid](#responsive-grid)

---

## 🔘 Buttons

### Primary Button (Main CTA)

```jsx
export default function PrimaryButton() {
  return (
    <button className="btn btn-primary">
      Save Changes
    </button>
  );
}
```

```jsx
// With loading state
export default function PrimaryButtonLoading() {
  const [loading, setLoading] = useState(false);
  
  return (
    <button 
      className="btn btn-primary" 
      disabled={loading}
      onClick={() => setLoading(true)}
    >
      {loading ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
```

### Secondary Button

```jsx
export default function SecondaryButton() {
  return (
    <button className="btn btn-secondary">
      Cancel
    </button>
  );
}
```

### Tertiary Button (Ghost Style)

```jsx
export default function TertiaryButton() {
  return (
    <button className="btn btn-tertiary">
      Learn More
    </button>
  );
}
```

### Button Sizes

```jsx
export default function ButtonSizes() {
  return (
    <div className="flex gap-md">
      <button className="btn btn-sm btn-primary">Small</button>
      <button className="btn btn-primary">Medium</button>
      <button className="btn btn-lg btn-primary">Large</button>
    </div>
  );
}
```

### Button Group

```jsx
export default function ButtonGroup() {
  const [active, setActive] = useState('tab1');

  return (
    <div className="flex gap-sm">
      <button 
        className={active === 'tab1' ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={() => setActive('tab1')}
      >
        Tab 1
      </button>
      <button 
        className={active === 'tab2' ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={() => setActive('tab2')}
      >
        Tab 2
      </button>
      <button 
        className={active === 'tab3' ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={() => setActive('tab3')}
      >
        Tab 3
      </button>
    </div>
  );
}
```

---

## 📋 Forms

### Basic Form Input

```jsx
export default function FormInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    if (val.length < 3) {
      setError('At least 3 characters required');
    } else {
      setError('');
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="name" className="form-label required">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        className={`form-control ${error ? 'error' : ''}`}
        placeholder="John Doe"
        value={value}
        onChange={handleChange}
      />
      {error && <div className="form-error">{error}</div>}
      <div className="form-help">Your full legal name</div>
    </div>
  );
}
```

### Complete Form

```jsx
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="form-group">
        <label htmlFor="name" className="form-label required">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label required">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label required">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="Your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {submitted && (
        <div className="alert alert-success mb-6">
          ✓ Message sent successfully!
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    </form>
  );
}
```

### Inline Form

```jsx
export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  return (
    <form className="flex gap-md">
      <input
        type="email"
        className="form-control flex-1"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
```

---

## 🎯 Cards

### Basic Card

```jsx
export default function BasicCard() {
  return (
    <div className="card">
      <h4>Card Title</h4>
      <p>
        This is a basic card component with a clean design and professional styling.
      </p>
      <button className="btn btn-primary text-sm">Learn More</button>
    </div>
  );
}
```

### Card with Header

```jsx
export default function CardWithHeader() {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Feature Highlights</h3>
      </div>
      <ul className="space-y-md">
        <li className="flex gap-md">
          <span className="badge badge-success">✓</span>
          <span>Fast and responsive</span>
        </li>
        <li className="flex gap-md">
          <span className="badge badge-success">✓</span>
          <span>Easy to customize</span>
        </li>
        <li className="flex gap-md">
          <span className="badge badge-success">✓</span>
          <span>Production ready</span>
        </li>
      </ul>
    </div>
  );
}
```

### Elevated Card

```jsx
export default function ElevatedCard() {
  return (
    <div className="card card-elevated">
      <h4>Premium Card</h4>
      <p>This card has an elevated shadow for extra emphasis.</p>
    </div>
  );
}
```

### Card Grid

```jsx
export default function CardGrid() {
  const features = [
    {
      title: 'Feature One',
      description: 'First feature description',
      icon: '🎨'
    },
    {
      title: 'Feature Two',
      description: 'Second feature description',
      icon: '⚡'
    },
    {
      title: 'Feature Three',
      description: 'Third feature description',
      icon: '🔒'
    },
  ];

  return (
    <div className="grid grid-cols-3">
      {features.map(feature => (
        <div key={feature.title} className="card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {feature.icon}
          </div>
          <h4>{feature.title}</h4>
          <p className="text-sm text-secondary">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📐 Layouts

### Hero Section

```jsx
export default function HeroSection() {
  return (
    <section 
      className="section-lg"
      style={{
        background: 'linear-gradient(to right, var(--color-primary-600), var(--color-primary-700))',
        color: 'white'
      }}
    >
      <div className="container text-center">
        <h1 style={{ color: 'white', marginBottom: '1rem' }}>
          Welcome to Your Portfolio
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
          A clean, professional, and modern design system
        </p>
        <button className="btn btn-primary">
          Get Started
        </button>
      </div>
    </section>
  );
}
```

### Two-Column Layout

```jsx
export default function TwoColumnLayout() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-2 gap-xl">
          <div>
            <h2>Left Column</h2>
            <p>
              Content for the left side of your layout with clean typography
              and professional styling.
            </p>
          </div>
          <div>
            <img src="/placeholder.jpg" alt="Placeholder" className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Three-Column Layout

```jsx
export default function ThreeColumnLayout() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-6">Three Columns</h2>
        <div className="grid grid-cols-3 gap-lg">
          <div className="card">Column 1</div>
          <div className="card">Column 2</div>
          <div className="card">Column 3</div>
        </div>
      </div>
    </section>
  );
}
```

### Sidebar Layout

```jsx
export default function SidebarLayout() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-xl" style={{ gridTemplateColumns: '250px 1fr' }}>
          {/* Sidebar */}
          <aside className="space-y-md">
            <nav className="card p-4">
              <ul className="space-y-sm">
                <li><a href="#" className="text-primary">Link 1</a></li>
                <li><a href="#" className="text-primary">Link 2</a></li>
                <li><a href="#" className="text-primary">Link 3</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            <div className="card">
              <h2>Main Content</h2>
              <p>Your main content goes here...</p>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
```

---

## 🔤 Typography

### Heading Hierarchy

```jsx
export default function Typography() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <h1>Heading 1 - Main Title</h1>
        <p>This is a paragraph under h1. Use this for your main page title.</p>

        <h2>Heading 2 - Section Title</h2>
        <p>This is a paragraph under h2. Use this for major section titles.</p>

        <h3>Heading 3 - Subsection Title</h3>
        <p>This is a paragraph under h3. Use this for subsection titles within a major section.</p>

        <h4>Heading 4 - Card Title</h4>
        <p>This is a paragraph under h4. Use this for card titles and minor headings.</p>

        <h5>Heading 5 - List Title</h5>
        <p>This is a paragraph under h5. Use this for form labels and list titles.</p>

        <h6>HEADING 6 - UPPERCASE LABEL</h6>
        <p>This is a paragraph under h6. Use this for captions and uppercase labels.</p>

        <p className="subtitle">This is a subtitle text - larger and emphasized</p>
        <p className="secondary">This is secondary text - slightly grayed out</p>
        <p className="tertiary">This is tertiary text - very light and subtle</p>
        <small>This is small text - for captions and helper text</small>
      </div>
    </section>
  );
}
```

---

## 🎨 Colors

### Color Palette Reference

```jsx
export default function ColorPalette() {
  const colors = {
    primary: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    secondary: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    accent: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  };

  return (
    <section className="section">
      <div className="container">
        <h2>Color Palette</h2>

        {/* Primary Colors */}
        <h3 className="mt-6 mb-4">Primary - Teal/Cyan</h3>
        <div className="grid grid-cols-10 gap-sm">
          {colors.primary.map(shade => (
            <div key={`primary-${shade}`} className="text-center">
              <div
                style={{
                  backgroundColor: `var(--color-primary-${shade})`,
                  height: '60px',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  marginBottom: '0.5rem'
                }}
              />
              <small className="text-xs">{shade}</small>
            </div>
          ))}
        </div>

        {/* Secondary Colors */}
        <h3 className="mt-6 mb-4">Secondary - Purple</h3>
        <div className="grid grid-cols-10 gap-sm">
          {colors.secondary.map(shade => (
            <div key={`secondary-${shade}`} className="text-center">
              <div
                style={{
                  backgroundColor: `var(--color-secondary-${shade})`,
                  height: '60px',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  marginBottom: '0.5rem'
                }}
              />
              <small className="text-xs">{shade}</small>
            </div>
          ))}
        </div>

        {/* Status Colors */}
        <h3 className="mt-6 mb-4">Status Colors</h3>
        <div className="grid grid-cols-4 gap-lg">
          <div className="card" style={{ borderLeft: '4px solid var(--color-success)' }}>
            <strong>Success</strong>
            <small className="block">#16a34a</small>
          </div>
          <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <strong>Warning</strong>
            <small className="block">#ca8a04</small>
          </div>
          <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
            <strong>Danger</strong>
            <small className="block">#dc2626</small>
          </div>
          <div className="card" style={{ borderLeft: '4px solid var(--color-info)' }}>
            <strong>Info</strong>
            <small className="block">#0284c7</small>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Text Color Utilities

```jsx
export default function TextColors() {
  return (
    <div className="space-y-md">
      <p className="text-primary">Primary colored text (teal)</p>
      <p className="text-secondary">Secondary colored text (purple)</p>
      <p className="text-accent">Accent colored text (blue)</p>
      <p className="text-success">Success colored text (green)</p>
      <p className="text-warning">Warning colored text (amber)</p>
      <p className="text-danger">Danger colored text (red)</p>
    </div>
  );
}
```

---

## 📱 Responsive Grid

### Auto-Fit Grid (Recommended)

```jsx
export default function AutoFitGrid() {
  const items = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6">Auto-Fit Grid Layout</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {items.map(item => (
            <div key={item} className="card">
              <h4>Card {item}</h4>
              <p>This grid automatically adjusts to screen size.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Fixed Column Grid

```jsx
export default function FixedColumnGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6">Responsive Grid</h2>
        <div className="grid grid-cols-3">
          <div className="card">Column 1</div>
          <div className="card">Column 2</div>
          <div className="card">Column 3</div>
          <div className="card">Column 4</div>
          <div className="card">Column 5</div>
          <div className="card">Column 6</div>
        </div>
      </div>
    </section>
  );
}
```

### Responsive Breakdown

```jsx
export default function ResponsiveGrid() {
  // Grid will be:
  // Desktop (1024px+): 4 columns
  // Tablet (768px-1023px): 2 columns  
  // Mobile (<768px): 1 column
  
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="card">
              <h5>Item {i + 1}</h5>
              <p>Responsive at all breakpoints</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 🎯 Badges & Status

### Badges

```jsx
export default function Badges() {
  return (
    <div className="flex flex-wrap gap-md">
      <span className="badge badge-primary">Primary</span>
      <span className="badge badge-secondary">Secondary</span>
      <span className="badge badge-accent">Accent</span>
      <span className="badge badge-success">Success</span>
      <span className="badge badge-warning">Warning</span>
      <span className="badge badge-danger">Danger</span>
      <span className="badge badge-info">Info</span>
      <span className="badge badge-neutral">Neutral</span>
    </div>
  );
}
```

### Alerts

```jsx
export default function Alerts() {
  return (
    <div className="space-y-md">
      <div className="alert alert-success">
        ✓ Success message! Your action was completed successfully.
      </div>
      <div className="alert alert-warning">
        ⚠ Warning message! Please review before proceeding.
      </div>
      <div className="alert alert-danger">
        ✗ Error message! Something went wrong.
      </div>
      <div className="alert alert-info">
        ℹ Info message! Here's some important information.
      </div>
    </div>
  );
}
```

---

## 🔧 Spacing Utilities

### Gap Utilities

```jsx
export default function GapUtilities() {
  return (
    <div className="space-y-6">
      <div className="flex gap-xs p-4 bg-neutral-100">
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Gap XS</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Items</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Here</div>
      </div>

      <div className="flex gap-md p-4 bg-neutral-100">
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Gap MD</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Items</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Here</div>
      </div>

      <div className="flex gap-xl p-4 bg-neutral-100">
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Gap XL</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Items</div>
        <div className="bg-primary-600 text-white px-4 py-2 rounded">Here</div>
      </div>
    </div>
  );
}
```

---

## 📝 Tips & Best Practices

### Do's ✅
- Use semantic HTML (`<button>`, `<input>`, `<form>`)
- Use CSS variables for consistency
- Keep forms simple and focused
- Test on multiple screen sizes
- Use proper heading hierarchy
- Maintain color contrast for accessibility
- Use meaningful button text

### Don'ts ❌
- Don't use `<div>` for buttons (use `<button>`)
- Don't override design system colors arbitrarily
- Don't mix too many styles in one component
- Don't ignore responsive design
- Don't use placeholder as form labels
- Don't create inaccessible focus states
- Don't use vague button labels like "Click Here"

---

**Happy designing! Use these examples as building blocks for your portfolio.**
