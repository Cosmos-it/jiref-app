import React from 'react';

export default class footer extends React.Component {
  render() {

    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Jiref
      </footer>
    );
  }
};
