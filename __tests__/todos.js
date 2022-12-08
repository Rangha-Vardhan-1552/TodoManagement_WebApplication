const request=require("supertest")
const db=require("../models/index")
const app=require("../app")
 let server,agent;
 describe ("Todo test suite",()=>{
    beforeAll( async ()=>{
        await db.sequelize.sync({force:true});
        server=app.listen(8888,()=>{ });
        agent=request.agent(server)

        })
    afterAll(async()=>{
        await db.sequelize.close();
        server.close();
    })
    test("response with json at /todos",async()=>{
        const response=await agent.post('/todos').send({
            'title':'Buy milk',
            dueDate: new Date().toISOString(),
            completed:false
        });
        except(response.statusCode.toBe(200));
        except(response.header["content-type"]).toBe(
            "application/json; charset=utf-8"
        

        );
        const parseResponse=JSON.parse(Response.test);
        except(parseResponse.id).toBeDefined();
    });
 });