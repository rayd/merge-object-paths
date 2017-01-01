import { mergePaths } from '../src/index';
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

describe("#mergePaths", () => {
    let targetObject;

    beforeEach(() => {
        targetObject = {
            a: {
                foo: true,
                b: {
                    something: 'else',
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        }
                    }
                }
            }
        };
    });

    it("should set the specified value (string) at the specified path in targetObject", () => {
        expect(mergePaths(targetObject, {"a.b.c.something2": 'test'})).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    c: {
                        something2: 'test',
                        more: 999,
                        bar: {
                            more: 'data'
                        }
                    }
                }
            }
        });
    });

    it("should merge the specified value (object) at the specified path in targetObject", () => {
        expect(mergePaths(targetObject, {"a.b.c": { test: true }})).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        },
                        test: true
                    }
                }
            }
        });
    });

    it("should set the specified value (Array) at the specified path in targetObject", () => {
        expect(mergePaths(targetObject, {"a.b.test": ['a', 'b', 'c']})).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    test: ['a', 'b', 'c'],
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        }
                    }
                }
            }
        });
    });

    it("should overwrite non-object values that are in the update path", () => {
        expect(mergePaths(targetObject, { 'a.b.something.else': 1234 })).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: {
                        else: 1234
                    },
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        }
                    }
                }
            }
        });
    });

    it("should create new keys in targetObject as necessary", () => {
        expect(mergePaths(targetObject, { "a.b.c.d.e": { bar: false }})).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        },
                        d: {
                            e: {
                                bar: false
                            }
                        }
                    }
                }
            }
        });
    });

    it("should update multiple paths", () => {
        expect(mergePaths(targetObject, {
            "a.b.c.d": { foo: true },
            "a.b.c.d.e": { bar: false }
        })).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        },
                        d: {
                            foo: true,
                            e: {
                                bar: false
                            }
                        }
                    }
                }
            }
        });
    });

    it("should not mutate targetObject", () => {
        deepFreeze(targetObject);
        expect(mergePaths(targetObject, { "a.b.test": true })).to.deep.equal({
            a: {
                foo: true,
                b: {
                    something: 'else',
                    test: true,
                    c: {
                        more: 999,
                        bar: {
                            more: 'data'
                        }
                    }
                }
            }
        });
    });
});
