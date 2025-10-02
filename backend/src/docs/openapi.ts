import { env } from '../config/env.ts';

export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description:
      'Scalable Task Management System API (TypeScript, Express, MongoDB, JWT)\n\n' +
      'Build a full-stack Task Management System where users can create, update, and track tasks across projects \n\n'+
      'Raw JSON: [docs-json](http://localhost:4000/docs-json)\n\n'+
      '@ [API Support - Website](https://bappasahabapi.vercel.app/)'
      
  },

  servers: [
    { url: `http://localhost:${env.PORT}`, description: 'Local' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { error: { type: 'string' } },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          username: { type: 'string' },
          name: { type: 'string' },
          role: { type: 'string', enum: ['user','admin'] },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      Project: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          projectId: { type: 'string' },
          ownerId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['todo','in_progress','done','blocked','canceled'] },
          priority: { type: 'string', enum: ['low','medium','high','urgent'] },
          due: { type: 'string', nullable: true },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      AuthLoginRequest: {
        type: 'object',
        required: ['username','password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
      AuthRegisterRequest: {
        type: 'object',
        required: ['email','username','name','password'],
        properties: {
          email: { type: 'string' },
          username: { type: 'string' },
          name: { type: 'string' },
          password: { type: 'string' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      CreateProjectRequest: {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' } },
      },
      CreateTaskRequest: {
        type: 'object',
        required: ['projectId','title'],
        properties: {
          projectId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string' },
          priority: { type: 'string' },
          due: { type: 'string', nullable: true },
        },
      },
      UpdateTaskRequest: {
        type: 'object',
        properties: {
          projectId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string' },
          priority: { type: 'string' },
          due: { type: 'string', nullable: true },
        },
      },
    },
  },
  security: [],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/AuthRegisterRequest' } }
          }
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
          },
          '409': { description: 'Conflict', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          '400': { description: 'Bad Request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login with username/password',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/AuthLoginRequest' } }
          }
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
          },
          '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        }
      }
    },
    '/projects': {
      get: {
        tags: ['Projects'],
        summary: 'List projects',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Project' } } } }
          },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        tags: ['Projects'],
        summary: 'Create project',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateProjectRequest' } } }
        },
        responses: {
          '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Project' } } } },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    //common for all user
    // '/tasks': {
    //   get: {
    //     tags: ['Tasks'],
    //     summary: 'List tasks (scoped to current user)',
    //     security: [{ bearerAuth: [] }],
    //     parameters: [
    //       { name: 'q', in: 'query', schema: { type: 'string' } },
    //       { name: 'status', in: 'query', schema: { type: 'string', enum: ['all','todo','in_progress','done','blocked','canceled'] } },
    //       { name: 'projectId', in: 'query', schema: { type: 'string' } },
    //       { name: 'sort', in: 'query', schema: { type: 'string', enum: ['created_desc','due_asc'] } },
    //     ],
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //         content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } } } }
    //       },
    //       '401': { description: 'Unauthorized' }
    //     }
    //   },
    //   post: {
    //     tags: ['Tasks'],
    //     summary: 'Create task (owned by current user)',
    //     security: [{ bearerAuth: [] }],
    //     requestBody: {
    //       required: true,
    //       content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateTaskRequest' } } }
    //     },
    //     responses: {
    //       '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
    //       '401': { description: 'Unauthorized' }
    //     }
    //   }
    // },
        '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'List tasks (scoped to current user)',
        description: 'Returns only the tasks owned by the currently authorized user (based on the Bearer JWT).',
        security: [{ bearerAuth: [] }],  
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['all','todo','in_progress','done','blocked','canceled'] }, example: 'all' },
          { name: 'projectId', in: 'query', schema: { type: 'string' }, example: 'all' },
          { name: 'sort', in: 'query', schema: { type: 'string', enum: ['created_desc','due_asc'] }, example: 'created_desc' }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
                examples: {
                  AuthorizedUserTasks: {
                    summary: 'Example: tasks of the authorized user',
                    value: [
                      {
                        "projectId": "68dd91bdd0d23a8dc6de3898",
                        "ownerId": "68dd92bbd0d23a8dc6de38aa",
                        "title": "bappa-updated",
                        "description": "44444",
                        "status": "done",
                        "priority": "high",
                        "due": "2025-10-03",
                        "createdAt": "2025-10-01T20:46:12.337Z",
                        "updatedAt": "2025-10-01T20:47:39.193Z",
                        "id": "68dd9314d0d23a8dc6de38b8"
                      },
                      {
                        "projectId": "68dd91c0d0d23a8dc6de389a",
                        "ownerId": "68dd92bbd0d23a8dc6de38aa",
                        "title": "2",
                        "description": "",
                        "status": "todo",
                        "priority": "low",
                        "due": "2025-10-02",
                        "createdAt": "2025-10-01T20:45:17.150Z",
                        "updatedAt": "2025-10-01T20:45:17.150Z",
                        "id": "68dd92ddd0d23a8dc6de38b2"
                      }
                    ]
                  }
                }
              }
            }
          },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by id (must be owner)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not Found' }
        }
      },
      patch: {
        tags: ['Tasks'],
        summary: 'Update task (must be owner)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateTaskRequest' } } }
        },
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not Found' }
        }
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete task (must be owner)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '204': { description: 'No Content' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not Found' }
        }
      }
    }
  }
} as const;
