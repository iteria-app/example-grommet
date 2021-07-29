import { Blank } from 'grommet-icons';

const SortableIcon = () => (
  <Blank color="text-xweak" opacity="0.3">
    <g fill="none" stroke="#000" strokeWidth="2">
      <path d="M 6 10 L 12 6 L 18 10" />
      <path d="M 6 14 L 12 18 L 18 14" />
    </g>
  </Blank>
);

export const tableTheme = {
    global: {
      font: {
        family: 'Helvetica',
      },
    },
    dataTable: {
      header: {
        color: 'text-strong',
        //extend: ({ column }: { column: any }, { sort }: { sort: any }, { sortable }: { sortable: any }) => `
        //@ts-ignore //TODO
        extend: (column, sort, sortable) => `
            ${sortable &&
          sort &&
          sort.property !== column &&
          `
                :hover {
                  svg {
                    opacity: 100%;
                  }
                }
              `}
           `,
      },
      icons: {
        sortable: SortableIcon,
      },
    },
  };