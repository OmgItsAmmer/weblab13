import { useState, useEffect } from 'react';

function GuestForm({ onAddGuest }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // useEffect to respond to form state changes
  useEffect(() => {
    console.log('✅ GuestForm: Form state updated - Name:', name, 'Email:', email);
  }, [name, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() === '' || email.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    const guestData = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      confirmed: false,
      rsvp: false
    };

    console.log('📝 Form submitting with data:', guestData);
    onAddGuest(guestData);

    // Reset form - these state updates are also asynchronous!
    console.log('📝 BEFORE reset - Name:', name, 'Email:', email);
    setName('');
    setEmail('');
    // ❌ These will still show old values immediately
    console.log('❌ AFTER reset (immediate) - Name still:', name, 'Email still:', email);
  };

  return (
    <form onSubmit={handleSubmit} className="guest-form">
      <h2>Add New Guest</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter guest name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter guest email"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Guest</button>
    </form>
  );
}

export default GuestForm;
