import React, { Component } from "react";
import ContactForm from './Form/Form'
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Title } from "./Global.style"; 



export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedTodos = JSON.parse(contacts);

    if (parsedTodos) { this.setState({ contacts: parsedTodos }) };
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  appHandleSubmit = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onAddContact = newContact => {
    if (this.offAddContact(newContact.name)) {
      alert('Contact with this name already exists!');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  offAddContact = newContactName => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContactName.toLowerCase()
    );
  };

  onFilterSearch = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <Title>Phonebook</Title>
        <ContactForm
          contacts={contacts}
          onSubmit={this.appHandleSubmit}
          onAddContact={this.onAddContact}
        />
        <Title>Contacts</Title>
        <Filter filter={filter} onFilterSearch={this.onFilterSearch} />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
};