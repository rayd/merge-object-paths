/**
 * Merges the data into the specified paths without mutating the target object.
 *
 * @param  {object} target  The target object to merge data into.
 * @param  {object} values  An object mapping paths in the target object to the
 *                          value we want to set at that location. The keys for
 *                          each property in the target object should be
 *                          delimited by periods. For example:
 *                            {
 *                                'one.two': {
 *                                    three: [ '1', '2', '3' ]
 *                                },
 *                                'a.b.c': true,
 *                                [`foo.${someVar}.bar`]: 19
 *                            }
 *
 ** @return {object}        A new object reflecting the merged data.
 */
export function mergePaths(target, values) {
    let newObject = Object.assign({}, target);
    Object.keys(values).forEach((path) => {
        newObject = mergePath(path.split("."), newObject, values[path]);
    });
    return newObject;
}

function mergePath(keys, oldData, newData) {
    const first = keys.slice(0,1)[0];
    // If we have more keys left in the path, continue merging.
    if (keys.length > 1) {
        let existing = oldData[first];
        // If we're trying to merge data into something that's not an object,
        // overwrite the non-object target.
        if (!isObject(existing)) {
            existing = {};
        }

        return Object.assign({}, oldData, {
            [first]: Object.assign({}, existing, mergePath(keys.slice(1), existing, newData))
        });
    }
    else {
        // When we're at the end of the update path, set the specified data.
        if (isObject(newData)) {
            newData = Object.assign({}, oldData[first], newData);
        }
        return Object.assign({}, oldData, { [first]: newData });
    }
}

function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
