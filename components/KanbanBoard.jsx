import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';
import filterIcon from './images/filter-icon.png';
import filterIcon1 from './images/filter-icon1.png'; // Adjust the path to your filter icon image

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);



//   useEffect(() => {
//     axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
//       .then(response => setTickets(response.data.tickets))
//       .catch(error => console.error(error));
//   }, []);

useEffect(() => {
    const savedViewState = JSON.parse(localStorage.getItem('kanbanViewState'));
    if (savedViewState) {
      setGroupingOption(savedViewState.groupingOption);
      setSortingOption(savedViewState.sortingOption);
    }

    // Fetch API data
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => setTickets(response.data.tickets))
      .catch(error => console.error(error));
  }, []);

    // Save user's view state to localStorage whenever it changes
    useEffect(() => {
        const viewStateToSave = {
          groupingOption,
          sortingOption,
        };
        localStorage.setItem('kanbanViewState', JSON.stringify(viewStateToSave));
      }, [groupingOption, sortingOption]);

  const groupByStatus = () => {
    const groupedTickets = {};
    tickets.forEach(ticket => {
      const groupKey = ticket[groupingOption];
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });
    return groupedTickets;
  };

  const sortTickets = (tickets) => {
    if (sortingOption === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
    // Update ticket statuses, user assignments, or priorities based on the result
  };

  const groupedTickets = groupByStatus();

  const handleDisplayDropdownToggle = () => {
    setDisplayDropdownOpen(!displayDropdownOpen);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="display-dropdown">
            <button onClick={handleDisplayDropdownToggle}>
              <img src={filterIcon} alt="Filter" className="filter-icon" />
              Display
              <img src={filterIcon1} alt="Filter" className="filter-icon1" />
            </button>
            {displayDropdownOpen && (
              <div className="display-options">
                <div className='display-button'>
                  Grouping 
                  <select className="grp"value={groupingOption} onChange={event => setGroupingOption(event.target.value)}>
                    <option value="status">Status</option>
                    <option value="userId">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className='display-button'>
                  Sorting 
                  <select className="sort" value={sortingOption} onChange={event => setSortingOption(event.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            )}
          </div>
      <div className="kanban-board">
        <div className="controls">
          
        </div>
        <div className="kanban-columns">
          {Object.keys(groupedTickets).map(groupKey => (
            <KanbanColumn
              key={groupKey}
              title={groupKey}
              tickets={sortTickets(groupedTickets[groupKey])}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
