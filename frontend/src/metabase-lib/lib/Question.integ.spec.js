/* @flow weak */

import { DATABASE_ID, ORDERS_TABLE_ID, metadata } from "metabase/__support__/sample_dataset_fixture";
import Question from "metabase-lib/lib/Question";
import { login } from "metabase/__support__/integrated_tests";
import { NATIVE_QUERY_TEMPLATE } from "metabase-lib/lib/queries/NativeQuery";

// const question = Question.create({databaseId: DATABASE_ID, tableId: ORDERS_TABLE_ID, metadata})
// // count of rows summarization
// const results = await summarizedQuestion.getResults()
// expect(results[0]).toBeDefined();
//
// // sum of subtotal aggregation
// const results = await summarizedQuestion.getResults()
// expect(results[0]).toBeDefined();
//
// expect(results[0].data.rows[0][0]).toBeCloseTo(1034792.85, 2);
describe("Question", () => {
    beforeAll(async () => {
        await login();
    })

    describe("with SQL questions", () => {
        it("should return correct result with a static template tag parameter", async () => {
            const templateTagName = "orderid"
            const templateTagId = "f1cb12ed3-8727-41b6-bbb4-b7ba31884c30"
            const question = Question.create({ databaseId: DATABASE_ID, tableId: ORDERS_TABLE_ID, metadata })
                .setDatasetQuery({
                    ...NATIVE_QUERY_TEMPLATE,
                    database: DATABASE_ID,
                    native: {
                        query: `SELECT SUBTOTAL FROM ORDERS WHERE id = {{${templateTagName}}}`,
                        template_tags: {
                            [templateTagName]: {
                                id: templateTagId,
                                name: templateTagName,
                                display_name: "Order ID",
                                type: "number"
                            }
                        }
                    }
                })

            // Without a template tag the query should fail
            const results1 = await question.getResults({ignoreCache: true})
            expect(results1[0].status).toBe('failed');

            question._parameterValues = { [templateTagId]: "5" };
            const results2 = await question.getResults({ignoreCache: true})
            expect(results2[0]).toBeDefined();
            expect(results2[0].data.rows[0][0]).toEqual(18.1);
        })

        it("should return correct result with an optional template tag clause", async () => {
            const templateTagName = "orderid"
            const templateTagId = "f1cb12ed3-8727-41b6-bbb4-b7ba31884c30"
            const question = Question.create({ databaseId: DATABASE_ID, tableId: ORDERS_TABLE_ID, metadata })
                .setDatasetQuery({
                    ...NATIVE_QUERY_TEMPLATE,
                    database: DATABASE_ID,
                    native: {
                        query: `SELECT SUBTOTAL FROM ORDERS [[WHERE id = {{${templateTagName}}}]]`,
                        template_tags: {
                            [templateTagName]: {
                                id: templateTagId,
                                name: templateTagName,
                                display_name: "Order ID",
                                type: "number"
                            }
                        }
                    }
                })

            const results1 = await question.getResults({ignoreCache: true})
            expect(results1[0]).toBeDefined();
            expect(results1[0].data.rows.length).toEqual(10000);

            question._parameterValues = { [templateTagId]: "5" };
            const results2 = await question.getResults({ignoreCache: true})
            expect(results2[0]).toBeDefined();
            expect(results2[0].data.rows[0][0]).toEqual(18.1);
        })
    })
});
