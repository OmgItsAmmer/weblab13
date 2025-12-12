  import { useEffect } from 'react';

  function RSVPSummary({ guests }) {
    const totalGuests = guests.length;
    const confirmedGuests = guests.filter(g => g.confirmed).length;
    const unconfirmedGuests = totalGuests - confirmedGuests;
    const rsvpCount = guests.filter(g => g.rsvp).length;

    // Demonstrate useEffect - responds to state changes
    useEffect(() => {
      console.log('Guest list updated!');
      console.log('Total guests:', totalGuests);
      console.log('Confirmed:', confirmedGuests);
      console.log('RSVP Count:', rsvpCount);
    }, [guests, totalGuests, confirmedGuests, rsvpCount]);

    return (
      <div className="rsvp-summary">
        <h2>Event Summary</h2>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Guests:</span>
            <span className="stat-value">{totalGuests}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Confirmed:</span>
            <span className="stat-value">{confirmedGuests}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unconfirmed:</span>
            <span className="stat-value">{unconfirmedGuests}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">RSVP'd:</span>
            <span className="stat-value">{rsvpCount}</span>
          </div>
        </div>
      </div>
    );
  }

  export default RSVPSummary;
