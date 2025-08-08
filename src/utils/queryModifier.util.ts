import { Op } from "sequelize";

export function queryModifier(query: any) {
    let offsetTables, limitTables, attributesTables, includeQuery: any = {}, orderBy: any[] = [], distinct;
    Object.keys(query).forEach((key) => {
        const value = query[key];
        if (typeof value === 'string' && value.includes(',')) {
            const values = value.trim().split(',').map((item) => item.trim());
            if (values.includes('_null')) {
                query[key] = {
                    [Op.or]: [...values.filter((item) => item !== '_null'), { [Op.is]: null },
                    ],
                };
            } else {
                query[key] = values.map((item: any) => (isNaN(item) ? item : Number(item)));
            }
        }
        if (value.endsWith('_lk') && value.startsWith('_lk') && typeof value === 'string') {
            const trimmedValue = value.slice(3, -3);
            query[key] = { [Op.like]: `%${trimmedValue}%` };
        }
        if (key.includes('->')) {
            const partsKey = key.split('->');
            const join = partsKey[0];
            const attribute = partsKey[1];
            const values = query[key];

            if (!includeQuery[join]) includeQuery[join] = {};
            includeQuery[join][attribute] = values;
            delete query[key];
        }
    });

    if ((query && query._offset) || (query && query._limit) || (query && query._cmp) || (query && query._orderby && query._ordertype)) {
        if (Array.isArray(query._offset)) {
            if (typeof query._offset[0] === 'string') {
                offsetTables = parseInt(query._offset[0], 10);
            }
        } else if (typeof query._offset === 'string') {
            offsetTables = parseInt(query._offset, 10);
        }
        if (Array.isArray(query._limit)) {
            if (typeof query._limit[0] === 'string') {
                limitTables = parseInt(query._limit[0], 10);
            }
        } else if (typeof query._limit === 'string') {
            limitTables = parseInt(query._limit, 10);
        }
        if (query._cmp && Array.isArray(query._cmp)) {
            attributesTables = query._cmp.filter((item: string) => item != 'password_hash');
        } else if (query._cmp && !Array.isArray(query._cmp) && query._cmp != 'password_hash') {
            attributesTables = [query._cmp];
        }
        if (query._orderby && query._ordertype) {
            orderBy = [[query._orderby, query._ordertype]];
        }

        delete query._offset;
        delete query._limit;
        delete query._cmp;
        delete query._orderby;
        delete query._ordertype;
    };
    if(query._distinct){
        distinct = query._distinct;
        delete query._distinct;
    }
    if (query._cache) {
        delete query._cache;
    }
    return [query, offsetTables, limitTables, attributesTables, includeQuery, orderBy, distinct];
}