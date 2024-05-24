import React, { useState, useEffect, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { FinanceContext } from '../context/FinanceProvider'

const Calendar = () => {
  const { state, dispatch } = useContext(FinanceContext)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const purchases = state.purchases.map(purchase => ({
      id: purchase.id,
      title: `${purchase.note} - ${purchase.amount}`,
      start: new Date(purchase.date),
      allDay: true
    }))
    setEvents(purchases)
  }, [state.purchases])

  const handleEventClick = (info) => {
    const event = events.find(e => e.id === info.event.id)
    setSelectedEvent(event)
  }

  const handleEventDrop = (info) => {
    const {event} = info
    const updatedEvents = events.map(e => {
      if(e.id === event.id){
        return{
          ...e,
          start: event.start
        }
      }
      return e
    })
    setEvents(updatedEvents)
    dispatch({type: 'UPDATE_PURCHASE_DATE', payload: { id: event.id, date: event.start }})
  }

  return (
    <div className="my-custom-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        editable={true}
        droppable={true}
        eventDrop={handleEventDrop}
      />
      {selectedEvent && (
        <div className="modal show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Event Details</h5>
              <button type="button" className="btn-close" onClick={() => setSelectedEvent(null)}></button>
            </div>
            <div className="modal-body">
              <p>Title: {selectedEvent.title}</p>
              <p>Start: {new Date(selectedEvent.start).toDateString()}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Calendar