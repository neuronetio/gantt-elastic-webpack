import GanttElastic from 'gantt-elastic';

// just helper to get current dates
function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(`${currentYear}-${currentMonth}-${currentDay} 00:00:00`).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000);
}

const tasks = [
  {
    id: 1,
    label: 'Make some noise',
    user: '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
    start: getDate(-24 * 5),
    duration: 5 * 24 * 60 * 60,
    progress: 85,
    type: 'project'
  }, {
    id: 2,
    label: 'With great power comes great responsibility',
    user: '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
    parentId: 1,
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60,
    progress: 50,
    type: 'milestone',
    style: {
      fill: '#1EBC61',
      stroke: '#0EAC51'
    },
    progressBarStyle: {
      bar: {
        fill: '#0EAC51'
      }
    }
  }, {
    id: 3,
    label: 'Courage is being scared to death, but saddling up anyway.',
    user: '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60,
    progress: 100,
    type: 'task'
  }, {
    id: 4,
    label: 'Put that toy AWAY!',
    user: '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60,
    progress: 50,
    type: 'task',
    dependentOn: [3]
  }, {
    id: 5,
    label: 'One billion, gajillion, fafillion... shabadylu...mil...shabady......uh, Yen.',
    user: '<a href="https://www.google.com/search?q=Austin+Powers" target="_blank" style="color:#0077c0;">Austin Powers</a>',
    parentId: 4,
    start: getDate(0),
    duration: 2 * 24 * 60 * 60,
    progress: 10,
    type: 'milestone',
    style: {
      fill: '#0287D0',
      stroke: '#0077C0'
    },
    progressBarStyle: {
      bar: {
        fill: '#0077C0'
      }
    }
  }, 
];

const options = {
  title: {
    label: 'Your project title as html (link or whatever...)',
    html: false,
    style: {
      'font-size': '20px',
      'vertical-align': 'middle',
      'font-weight': '400',
      'line-height': '35px',
      'padding-left': '22px',
      'letter-spacing': '1px'
    }
  },
  taskList: {
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40
      }, {
        id: 2,
        label: 'Description',
        value: 'label',
        width: 200,
        expander: true
      }, {
        id: 3,
        label: 'Assigned to',
        value: 'user',
        width: 130,
        html: true
      }, {
        id: 3,
        label: 'Start',
        value: (task) => task.startDate.format('YYYY-MM-DD'),
        width: 78
      }, {
        id: 4,
        label: 'Type',
        value: 'type',
        width: 68
      }, {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
        styles: {
          label: {
            'text-align': 'center',
            'width': '100%'
          },
          value: {
            'text-align': 'center',
            'width': '100%'
          }
        }
      }
    ]
  },
  locale: {
    code: 'en',
    'Now': 'Now',
    'X-Scale': 'Zoom-X',
    'Y-Scale': 'Zoom-Y',
    'Task list width': 'Task list',
    'Before/After': 'Expand',
    'Display task list': 'Task list'
  },
};

let gantt = new Vue({
  components: {
    'gantt-elastic': GanttElastic
  },
  el: '#gantt',
  template: `<gantt-elastic :tasks="tasks" :options="options"></gantt-elastic>`,
  data: {
    tasks,
    options
  }
});
