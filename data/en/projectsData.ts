import type { Project } from '~/types/data'

export let projectsData: Project[] = [
  {
    type: 'contributor',
    title: 'Podman desktop',
    description:
      'Podman Desktop is an open source graphical tool enabling you to seamlessly work with containers and Kubernetes from your local environment.',
    imgSrc: '/static/images/podman-desktop.png',
    repo: 'containers/podman-desktop',
    builtWith: ['Typescript', 'Solid', 'Vitest', 'Electron'],
    url: 'https://podman-desktop.io/',
  },
  {
    type: 'mine',
    title: 'QIWI SDK',
    description:
      'Developer-friendly library enabling smooth connection to payment gateways and efficient handling of real-time transaction updates',
    imgSrc: '/static/images/glqiwiapi.jpeg',
    repo: 'GLEF1X/glQiwiApi',
    builtWith: ['Python3', 'Docker', 'Github Actions', 'pytest'],
  },
  {
    type: 'mine',
    title: 'Personal website',
    imgSrc: '/static/images/glebblog.png',
    repo: 'glefix-dev/glefix.dev',
    builtWith: ['Next.js', 'Tailwind', 'Typescript', 'Prisma', 'Radix'],
  },
  {
    type: 'mine',
    title: 'FastAPI admin',
    imgSrc: '/static/images/fastapi-admin.png',
    description:
      'Developer-centric framework for seamlessly integrating robust admin panels into FastAPI applications, offering intuitive CRUD operations, authorization, file management and real-time data management capabilities',
    repo: 'GLEF1X/fastapi-admin2',
    builtWith: ['FastAPI', 'Python', 'Postgres', 'Redis', 'AWS'],
  },
]
