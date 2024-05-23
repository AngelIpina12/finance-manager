import React, { useState, useEffect, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { FinanceContext } from '../context/FinanceProvider'
import { eventTupleToStore } from '@fullcalendar/core/internal'

const Calendar = () => {
  const { state } = useContext(FinanceContext)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const purchases = state.purchases.map(purchase => ({
      title: `${purchase.note} - ${purchase.amount}`,
      start: purchase.date,
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
    dispatchEvent({type: 'UPDATE_PURCHASE_DATE', payload: { id: event.id, date: event.start }})
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
    </div>
  )
}

export default Calendar