import { useState, useEffect } from 'react';
import GuestForm from './GuestForm';
import GuestList from './GuestList';
import RSVPSummary from './RSVPSummary';
import './App.css';

function App() {
  const [guests, setGuests] = useState([]);

  // useEffect to respond to state changes - this runs AFTER state updates
  useEffect(() => {
    console.log('✅ State updated! Current guests:', guests);
    console.log('✅ Total guests count:', guests.length);
  }, [guests]);

  const handleAddGuest = (guestData) => {
    console.log('📝 BEFORE setState - Current guests:', guests);
    console.log('📝 Attempting to add guest:', guestData);
    
    setGuests(prevGuests => {
      const newGuests = [...prevGuests, guestData];
      console.log('📝 INSIDE setState callback - New guests array:', newGuests);
      return newGuests;
    });
    
    // ❌ This will show OLD state - state updates are asynchronous!
    console.log('❌ AFTER setState (immediate) - Still shows old state:', guests);
    console.log('❌ This is why state appears "delayed" - React batches updates!');
  };

  const handleUpdateGuest = (guestId, updates) => {
    console.log('📝 BEFORE update - Current guests:', guests);
    console.log('📝 Updating guest ID:', guestId, 'with:', updates);
    
    setGuests(prevGuests => {
      const updated = prevGuests.map(guest => 
        guest.id === guestId 
          ? { ...guest, ...updates } 
          : guest
      );
      console.log('📝 INSIDE setState callback - Updated guests:', updated);
      return updated;
    });
    
    // ❌ This will show OLD state
    console.log('❌ AFTER setState (immediate) - Still shows old state:', guests);
  };

  const handleRemoveGuest = (guestId) => {
    console.log('📝 BEFORE remove - Current guests:', guests);
    console.log('📝 Removing guest ID:', guestId);
    
    setGuests(prevGuests => {
      const filtered = prevGuests.filter(guest => guest.id !== guestId);
      console.log('📝 INSIDE setState callback - Remaining guests:', filtered);
      return filtered;
    });
    
    // ❌ This will show OLD state
    console.log('❌ AFTER setState (immediate) - Still shows old state:', guests);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Event Planner</h1>
      </header>

      <div className="app-container">
        <div className="left-section">
          <GuestForm onAddGuest={handleAddGuest} />
          <RSVPSummary guests={guests} />
        </div>

        <div className="right-section">
          <GuestList 
            guests={guests}
            onUpdateGuest={handleUpdateGuest}
            onRemoveGuest={handleRemoveGuest}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
