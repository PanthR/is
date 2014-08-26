(function(define) { 'use strict';
define(function(require) {

   /**
    * @module is
    * @author Bill Altermatt <altermattw@hanover.edu>
    * Haris Skiadas <skiadas@hanover.edu>
    * Barb Wahl <wahl@hanover.edu>
    * @version 0.0.1
    * @date 8/18/2014
    * @description A collection of predicate functions for common tasks.
    *
    * All predicates are functions that return a boolean based on a condition on their
    * argument. There are a number of ways of logically chaining predicates, see `is.not`,
    * `is.or`, `is.and`.
    */

   var is;

   is = {};

   function predify(f) {
      f.isPred = true;
      return f;
   }

   // Object checks

   /**
    * A predicate that tests if its argument has a given `typeof`.
    */
   is.typeof = function(typ) {
      return predify(function(n) { return typeof n === typ; });
   };
   /**
    * A predicate testing that its argument is a function
    */
   is.function = is.typeof('function');
   /**
    * A predicate testing that its argument is a number
    * (including infinity, NaN)
    */
   is.number = is.typeof('number');
   /**
    * A predicate testing that its argument is an array
    */
   is.array = predify(Array.isArray);

   // Numeric predicates

   /**
    * A predicate testing that its argument is missing, namely `undefined` or `null`
    * Does not detect NaNs. See `is.na` for that.
    */
   is.missing = predify(function(n) { return n == null; });

   /* eslint-disable no-self-compare */
   /**
    * A predicate testing that its argument is exactly NaN
    */
   is.nan = predify(function(n) { return n !== n; });
   /* eslint-enable */

   /**
    * A predicate testing that its argument is exactly "na"
    * meaning missing or NaN.
    */
   is.na = predify(function(n) { return is.nan(n) || is.missing(n); });

   /**
    * A predicate testing that its argument is Infinity (or -Infinity)
    */
   is.infinity = predify(function(n) { return n === Infinity || n === -Infinity; });

   /**
    * A predicate testing that its argument is a "real" number
    * i.e. a number that is not NaN nor Infinity
    */
   is.finite = predify(function(n) {
      return is.number(n) && !is.nan(n) && !is.infinity(n);
   });

   /**
    * A predicate testing that its argument is an integer number
    */
   is.integer = predify(function(n) { return is.finite(n) && Math.round(n) === n; });

   /**
    * Return a predicate testing that its argument is triple equal to `m`.
    */
   is.eq = function(m) { return predify(function(n) { return n === m; }); };

   /**
    * Return a predicate testing that its argument is (finite and)
    * greater than to `m`.
    */
   is.gt = function(m) { return predify(function(n) { return is.finite(n) && n > m; }); };
   /**
    * Return a predicate testing that its argument is (finite and)
    * greater than or equal to `m`.
    */
   is.ge = function(m) { return predify(function(n) { return is.finite(n) && n >= m; }); };
   /**
    * Return a predicate testing that its argument is (finite and)
    * less than to `m`.
    */
   is.lt = function(m) { return predify(function(n) { return is.finite(n) && n < m; }); };
   /**
    * Return a predicate testing that its argument is (finite and)
    * less than or equal to `m`.
    */
   is.le = function(m) { return predify(function(n) { return is.finite(n) && n <= m; }); };

   /**
    * A predicate testing that its argument is a finite positive number
    */
   is.positive = is.gt(0);
   /**
    * A predicate testing that its argument is a finite negative number
    */
   is.negative = is.lt(0);
   /**
    * A predicate testing that its argument is a finite non-positive number
    */
   is.nonpositive = is.ge(0);
   /**
    * A predicate testing that its argument is a finite non-negative number
    */
   is.nonnegative = is.le(0);

   /**
    * Return a predicate to test if its argument is between `a` and `b`. If `inclusive` is true,
    * the predicate accepts numbers equal to `a`, `b`. Defaults to false.
    * `a` and `b` can be in either order.
    */
   is.between = function(a, b, inclusive) {
      if (b < a) { var temp = a; a = b; b = temp; }
      return predify(inclusive ? function(n) { return n >= a && n <= b; } :
                                 function(n) { return n > a && n < b; }
      );
   };
   // String predicates

   /**
    * Return a predicate testing that its argument is contained in
    * the string `supr`
    */
   is.containedIn = function(supr) {
      return predify(function(n) { return supr.indexOf(n) > -1; });
   };
   /**
    * Return a predicate testing that its argument contains
    * the string `sub`
    */
   is.extensionOf = function(sub) {
      return predify(function(n) { return n.indexOf(sub) > -1; });
   };
   /**
    * Return a predicate testing that its argument starts with
    * the string `sub`
    */
   is.startingWith = function(sub) {
      return predify(function(n) { return n.indexOf(sub) === 0; });
   };
   /**
    * Return a predicate testing that its argument ends in
    * the string `sub`
    */
   is.endingIn = function(sub) {
      return predify(function(n) { return n.lastIndexOf(sub) === n.length - sub.length; });
   };

   // Combinators

   /**
    * Create a context, so that follow-up chained predicates
    * will be tested against the `prop` property of their arguments.
    * If `prop` is a function rather than a string, (e.g. Math.abs),
    * then the follow-up predicates will be applied to the result
    * of that function on their argument.
    */
   is.its = function its(prop) {
      var wrapper;
      wrapper = typeof prop === 'function' ?
         function(pred) { return predify(function(n) { return pred(prop(n)); }); } :
         function(pred) { return predify(function(n) { return n != null && pred(n[prop]); }); };
      /* TODO: This `is` doesn't feel quite right, but `this` breaks things. */
      return enrich(wrapper, is);
   };
   /**
    * Set a context so that follow-up predicates will be tested against the length
    * of their argument.
    */
   is.itsLength = is.its('length');
   /**
    * Set a context so that follow-up predicates will be tested against
    * the absolute value of their argument.
    */
   is.absolutely = is.its(Math.abs);

   /** ## Predicate combinations */

   /**
    * Set a context so that follow-up predicates will negate their result before returning
    */
   is.not = enrich(function(pred) { return predify(function(n) { return !pred(n); }); }, is);

   /** Create a predicate from the disjunction of its arguments. */
   is.or = function(preds) {
      // Arguments can be simple predicates or arrays of predicates
      preds = Array.prototype.concat.apply([], Array.prototype.slice.call(arguments));
      return conjunct(preds);
   };
   /** Synonym for `is.or` */
   is.any = is.or;
   /** `is.all` conjuncts its arguments.
    * Arguments can be simple predicates or arrays of predicates
    */
   is.all = function(preds) {
      preds = Array.prototype.concat.apply([], Array.prototype.slice.call(arguments));
      return disjunct(preds);
   };
   /** Synonym for `is.all` */
   is.and = is.all;



   /* Helper methods */

   function conjunct(preds) {
      return predify(function(n) {
         for (var i = 0; i < preds.length; i += 1) {
            if (preds[i](n)) { return true; }
         }
         return false;
      });
   }
   function disjunct(preds) {
      return predify(function(n) {
         for (var i = 0; i < preds.length; i += 1) {
            if (!preds[i](n)) { return false; }
         }
         return true;
      });
   }

   /* navigates down an object tree, wrapping predicates around with the wrapper.
      returns the resulting new object. */
   function enrich(wrapper, obj) {
      if (obj.isPred) { return predify(wrapper(obj)); }
      return (typeof obj === 'function' ? wrapFunction : wrapObject)(wrapper, obj);

      function wrapFunction(wrapper, fun) {
         return function(args) {
            args = Array.prototype.slice.call(arguments);
            return enrich(wrapper, fun.apply(null, args));
         };
      }
      function wrapObject(wrapper, obj) {
         var newObj, key;
         newObj = {};
         for (key in obj) {
            if (obj.hasOwnProperty(key)) {
               newObj[key] = enrich(wrapper, obj[key]);
            }
         }
         return newObj;
      }
   }

   return is;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));
