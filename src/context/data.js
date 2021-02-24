export const data = {
  teams: [
    {
      name: 'Frontend Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      id: 1
    },
    {
      name: 'Design Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      id: 2
    },
    {
      name: 'Backend Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      id: 3
    },
    {
      name: 'Managers Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      id: 4
    }
  ],
  users: [
    {
      id: 1,
      name: 'FE_Team_User1',
      teamId: 1
    },
    {
      id: 2,
      name: 'FE_Team_User2',
      teamId: 1
    },
    {
      id: 3,
      name: 'Des_Team_User1',
      teamId: 2
    },
    {
      id: 4,
      name: 'Des_Team_User2',
      teamId: 2
    },
    {
      id: 5,
      name: 'BE_Team_User1',
      teamId: 3
    },
    {
      id: 6,
      name: 'BE_Team_User2',
      teamId: 3
    },
    {
      id: 7,
      name: 'Man_Team_User1',
      teamId: 4
    },
    {
      id: 8,
      name: 'Man_Team_User2',
      teamId: 4
    },
  ],
  vacations: [
    {
      id: 1,
      startDate: '25.11.2020',
      endDate: '15.12.2020',
      userId: 1,
      isPaid: false
    },
    {
      id: 2,
      startDate: '31.12.2020',
      endDate: '07.01.2021',
      userId: 1,
      isPaid: true
    },
    {
      id: 3,
      startDate: '30.11.2020',
      endDate: '04.12.2020',
      userId: 2,
      isPaid: false
    },
    {
      id: 4,
      startDate: '20.03.2020',
      endDate: '22.03.2020',
      userId: 2,
      isPaid: false
    },


    {
      id: 5,
      startDate: '10.12.2020',
      endDate: '15.12.2020',
      userId: 3,
      isPaid: true
    },
    {
      id: 6,
      startDate: '05.02.2021',
      endDate: '15.02.2021',
      userId: 3,
      isPaid: true
    },
    {
      id: 7,
      startDate: '01.02.2020',
      endDate: '10.02.2020',
      userId: 4,
      isPaid: true
    },
    {
      id: 8,
      startDate: '20.02.2021',
      endDate: '22.02.2021',
      userId: 4,
      isPaid: false
    },


    {
      id: 9,
      startDate: '02.12.2020',
      endDate: '03.12.2020',
      userId: 5,
      isPaid: true
    },
    {
      id: 10,
      startDate: '05.02.2021',
      endDate: '15.02.2021',
      userId: 5,
      isPaid: true
    },
    {
      id: 11,
      startDate: '08.12.2020',
      endDate: '21.12.2020',
      userId: 6,
      isPaid: false
    },
    {
      id: 12,
      startDate: '20.02.2021',
      endDate: '22.02.2021',
      userId: 6,
      isPaid: false
    }
  ]
};
