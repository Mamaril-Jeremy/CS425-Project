import { n as set_current_component, r as run_all, o as current_component, p as is_function, q as get_store_value, t as noop, u as identity, c as create_ssr_component, g as getContext, k as validate_store, l as subscribe, w as each, f as add_attribute, h as escape, v as validate_component, m as missing_component, i as get_current_component, s as setContext, x as add_styles, y as set_store_value, z as createEventDispatcher } from "../../../chunks/ssr.js";
import { d as derived, r as readable, w as writable } from "../../../chunks/index.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
const index = "";
const DAY_IN_SECONDS = 86400;
function createDate(input = void 0) {
  if (input !== void 0) {
    return input instanceof Date ? _fromLocalDate(input) : _fromISOString(input);
  }
  return _fromLocalDate(/* @__PURE__ */ new Date());
}
function createDuration(input) {
  if (typeof input === "number") {
    input = { seconds: input };
  } else if (typeof input === "string") {
    let seconds = 0, exp = 2;
    for (let part of input.split(":", 3)) {
      seconds += parseInt(part, 10) * Math.pow(60, exp--);
    }
    input = { seconds };
  } else if (input instanceof Date) {
    input = { hours: input.getUTCHours(), minutes: input.getUTCMinutes(), seconds: input.getUTCSeconds() };
  }
  let weeks = input.weeks || input.week || 0;
  return {
    years: input.years || input.year || 0,
    months: input.months || input.month || 0,
    days: weeks * 7 + (input.days || input.day || 0),
    seconds: (input.hours || input.hour || 0) * 60 * 60 + (input.minutes || input.minute || 0) * 60 + (input.seconds || input.second || 0),
    inWeeks: !!weeks
  };
}
function cloneDate(date) {
  return new Date(date.getTime());
}
function addDuration(date, duration, x = 1) {
  date.setUTCFullYear(date.getUTCFullYear() + x * duration.years);
  let month = date.getUTCMonth() + x * duration.months;
  date.setUTCMonth(month);
  month %= 12;
  if (month < 0) {
    month += 12;
  }
  while (date.getUTCMonth() !== month) {
    subtractDay(date);
  }
  date.setUTCDate(date.getUTCDate() + x * duration.days);
  date.setUTCSeconds(date.getUTCSeconds() + x * duration.seconds);
  return date;
}
function addDay(date, x = 1) {
  date.setUTCDate(date.getUTCDate() + x);
  return date;
}
function subtractDay(date, x = 1) {
  return addDay(date, -x);
}
function setMidnight(date) {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function toLocalDate(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
function toISOString(date) {
  return date.toISOString().substring(0, 19);
}
function datesEqual(date1, ...dates2) {
  return dates2.every((date2) => date1.getTime() === date2.getTime());
}
function nextClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 >= 0 ? diff2 : diff2 + 7));
  return date;
}
function prevClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 <= 0 ? diff2 : diff2 - 7));
  return date;
}
function noTimePart(date) {
  return typeof date === "string" && date.length <= 10;
}
function copyTime(toDate, fromDate) {
  toDate.setUTCHours(fromDate.getUTCHours(), fromDate.getUTCMinutes(), fromDate.getUTCSeconds(), 0);
  return toDate;
}
function _fromLocalDate(date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ));
}
function _fromISOString(str) {
  const parts = str.match(/\d+/g);
  return new Date(Date.UTC(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
    Number(parts[3] || 0),
    Number(parts[4] || 0),
    Number(parts[5] || 0)
  ));
}
function debounce(fn, handle, queueStore) {
  queueStore.update((queue) => queue.set(handle, fn));
}
function assign(...args) {
  return Object.assign(...args);
}
function keys(object) {
  return Object.keys(object);
}
function min(...args) {
  return Math.min(...args);
}
function max(...args) {
  return Math.max(...args);
}
function symbol() {
  return Symbol("ec");
}
function createElement(tag, className, content) {
  let el = document.createElement(tag);
  el.className = className;
  if (typeof content == "string") {
    el.innerText = content;
  } else if (content.domNodes) {
    el.replaceChildren(...content.domNodes);
  } else if (content.html) {
    el.innerHTML = content.html;
  }
  return el;
}
let payloadProp = symbol();
function hasPayload(el) {
  return !!el?.[payloadProp];
}
function getPayload(el) {
  return el[payloadProp];
}
function getElementWithPayload(x, y, root = document) {
  for (let el of root.elementsFromPoint(x, y)) {
    if (hasPayload(el)) {
      return el;
    }
    if (el.shadowRoot) {
      let shadowEl = getElementWithPayload(x, y, el.shadowRoot);
      if (shadowEl) {
        return shadowEl;
      }
    }
  }
  return null;
}
function createView(view2, _viewTitle, _currentRange, _activeRange) {
  return {
    type: view2,
    title: _viewTitle,
    currentStart: _currentRange.start,
    currentEnd: _currentRange.end,
    activeStart: _activeRange.start,
    activeEnd: _activeRange.end,
    calendar: void 0
  };
}
function toViewWithLocalDates(view2) {
  view2 = assign({}, view2);
  view2.currentStart = toLocalDate(view2.currentStart);
  view2.currentEnd = toLocalDate(view2.currentEnd);
  view2.activeStart = toLocalDate(view2.activeStart);
  view2.activeEnd = toLocalDate(view2.activeEnd);
  return view2;
}
let eventId = 1;
function createEvents(input) {
  return input.map((event) => ({
    id: "id" in event ? String(event.id) : `{generated-${eventId++}}`,
    resourceIds: Array.isArray(event.resourceIds) ? event.resourceIds.map(String) : "resourceId" in event ? [String(event.resourceId)] : [],
    allDay: event.allDay ?? (noTimePart(event.start) && noTimePart(event.end)),
    start: createDate(event.start),
    end: createDate(event.end),
    title: event.title || "",
    titleHTML: event.titleHTML || "",
    editable: event.editable,
    startEditable: event.startEditable,
    durationEditable: event.durationEditable,
    display: event.display || "auto",
    extendedProps: event.extendedProps || {},
    backgroundColor: event.backgroundColor || event.color,
    textColor: event.textColor
  }));
}
function createEventSources(input) {
  return input.map((source) => ({
    events: source.events,
    url: source.url && source.url.trimEnd("&") || "",
    method: source.method && source.method.toUpperCase() || "GET",
    extraParams: source.extraParams || {}
  }));
}
function createEventChunk(event, start, end) {
  return {
    start: event.start > start ? event.start : start,
    end: event.end < end ? event.end : end,
    event
  };
}
function sortEventChunks(chunks) {
  chunks.sort((a, b) => a.start - b.start || b.event.allDay - a.event.allDay);
}
function prepareEventChunks(chunks, hiddenDays) {
  let longChunks = {};
  if (chunks.length) {
    sortEventChunks(chunks);
    let prevChunk;
    for (let chunk of chunks) {
      let dates = [];
      let date = setMidnight(cloneDate(chunk.start));
      while (chunk.end > date) {
        if (!hiddenDays.includes(date.getUTCDay())) {
          dates.push(cloneDate(date));
          if (dates.length > 1) {
            let key = date.getTime();
            if (longChunks[key]) {
              longChunks[key].chunks.push(chunk);
            } else {
              longChunks[key] = {
                sorted: false,
                chunks: [chunk]
              };
            }
          }
        }
        addDay(date);
      }
      if (dates.length) {
        chunk.date = dates[0];
        chunk.days = dates.length;
        chunk.dates = dates;
        if (chunk.start < dates[0]) {
          chunk.start = dates[0];
        }
        if (setMidnight(cloneDate(chunk.end)) > dates[dates.length - 1]) {
          chunk.end = dates[dates.length - 1];
        }
      } else {
        chunk.date = setMidnight(cloneDate(chunk.start));
        chunk.days = 1;
        chunk.dates = [chunk.date];
      }
      if (prevChunk && datesEqual(prevChunk.date, chunk.date)) {
        chunk.prev = prevChunk;
      }
      prevChunk = chunk;
    }
  }
  return longChunks;
}
function createEventContent(chunk, displayEventEnd, eventContent, theme, _intlEventTime, _view) {
  let timeText = _intlEventTime.formatRange(
    chunk.start,
    displayEventEnd && chunk.event.display !== "pointer" ? copyTime(cloneDate(chunk.start), chunk.end) : chunk.start
  );
  let content;
  if (eventContent) {
    content = is_function(eventContent) ? eventContent({
      event: toEventWithLocalDates(chunk.event),
      timeText,
      view: toViewWithLocalDates(_view)
    }) : eventContent;
  } else {
    switch (chunk.event.display) {
      case "background":
        content = "";
        break;
      case "pointer":
        content = {
          domNodes: [createElement("div", theme.eventTime, timeText)]
        };
        break;
      default:
        content = {
          domNodes: [
            ...chunk.event.allDay ? [] : [createElement("div", theme.eventTime, timeText)],
            createElement("div", theme.eventTitle, chunk.event.title)
          ]
        };
    }
  }
  return [timeText, content];
}
function createEventClasses(eventClassNames, event, _view) {
  if (eventClassNames) {
    if (is_function(eventClassNames)) {
      eventClassNames = eventClassNames({
        event: toEventWithLocalDates(event),
        view: toViewWithLocalDates(_view)
      });
    }
    return Array.isArray(eventClassNames) ? eventClassNames : [eventClassNames];
  }
  return [];
}
function toEventWithLocalDates(event) {
  return _cloneEvent(event, toLocalDate);
}
function _cloneEvent(event, dateFn) {
  event = assign({}, event);
  event.start = dateFn(event.start);
  event.end = dateFn(event.end);
  return event;
}
function eventIntersects(event, start, end, resource, timeMode) {
  return (event.start < end && event.end > start || !timeMode && datesEqual(event.start, event.end, start)) && (resource === void 0 || event.resourceIds.includes(resource.id));
}
function helperEvent(display) {
  return previewEvent(display) || ghostEvent(display) || pointerEvent(display);
}
function bgEvent(display) {
  return display === "background";
}
function previewEvent(display) {
  return display === "preview";
}
function ghostEvent(display) {
  return display === "ghost";
}
function pointerEvent(display) {
  return display === "pointer";
}
function btnTextDay(text) {
  return btnText(text, "day");
}
function btnTextWeek(text) {
  return btnText(text, "week");
}
function btnTextMonth(text) {
  return btnText(text, "month");
}
function btnText(text, period) {
  return {
    ...text,
    next: "Next " + period,
    prev: "Previous " + period
  };
}
function themeView(view2) {
  return (theme) => ({ ...theme, view: view2 });
}
function intl(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let intl2 = is_function($format) ? { format: $format } : new Intl.DateTimeFormat($locale, $format);
    return {
      format: (date) => intl2.format(toLocalDate(date))
    };
  });
}
function intlRange(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let intl2 = is_function($format) ? { formatRange: $format } : new Intl.DateTimeFormat($locale, $format);
    return {
      formatRange: (start, end) => intl2.formatRange(toLocalDate(start), toLocalDate(end))
    };
  });
}
function createOptions(plugins) {
  let options = {
    allDayContent: void 0,
    allDaySlot: true,
    buttonText: {
      today: "today"
    },
    date: /* @__PURE__ */ new Date(),
    datesSet: void 0,
    dayHeaderFormat: {
      weekday: "short",
      month: "numeric",
      day: "numeric"
    },
    displayEventEnd: true,
    duration: { weeks: 1 },
    events: [],
    eventBackgroundColor: void 0,
    eventTextColor: void 0,
    eventClassNames: void 0,
    eventClick: void 0,
    eventColor: void 0,
    eventContent: void 0,
    eventDidMount: void 0,
    eventMouseEnter: void 0,
    eventMouseLeave: void 0,
    eventSources: [],
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    firstDay: 0,
    flexibleSlotTimeLimits: false,
    // ec option
    headerToolbar: {
      start: "title",
      center: "",
      end: "today prev,next"
    },
    height: void 0,
    hiddenDays: [],
    highlightedDates: [],
    // ec option
    lazyFetching: true,
    loading: void 0,
    locale: void 0,
    nowIndicator: false,
    selectable: false,
    scrollTime: "06:00:00",
    slotDuration: "00:30:00",
    slotEventOverlap: true,
    slotHeight: 24,
    // ec option
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    slotMaxTime: "24:00:00",
    slotMinTime: "00:00:00",
    theme: {
      allDay: "ec-all-day",
      active: "ec-active",
      bgEvent: "ec-bg-event",
      bgEvents: "ec-bg-events",
      body: "ec-body",
      button: "ec-button",
      buttonGroup: "ec-button-group",
      calendar: "ec",
      compact: "ec-compact",
      content: "ec-content",
      day: "ec-day",
      dayHead: "ec-day-head",
      days: "ec-days",
      event: "ec-event",
      eventBody: "ec-event-body",
      eventTime: "ec-event-time",
      eventTitle: "ec-event-title",
      events: "ec-events",
      extra: "ec-extra",
      handle: "ec-handle",
      header: "ec-header",
      hiddenScroll: "ec-hidden-scroll",
      highlight: "ec-highlight",
      icon: "ec-icon",
      line: "ec-line",
      lines: "ec-lines",
      nowIndicator: "ec-now-indicator",
      otherMonth: "ec-other-month",
      sidebar: "ec-sidebar",
      sidebarTitle: "ec-sidebar-title",
      today: "ec-today",
      time: "ec-time",
      title: "ec-title",
      toolbar: "ec-toolbar",
      view: "",
      weekdays: ["ec-sun", "ec-mon", "ec-tue", "ec-wed", "ec-thu", "ec-fri", "ec-sat"],
      withScroll: "ec-with-scroll"
    },
    titleFormat: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    view: void 0,
    viewDidMount: void 0,
    views: {}
  };
  for (let plugin of plugins) {
    plugin.createOptions?.(options);
  }
  return options;
}
function createParsers(plugins) {
  let parsers = {
    date: (date) => setMidnight(createDate(date)),
    duration: createDuration,
    events: createEvents,
    eventSources: createEventSources,
    hiddenDays: (days2) => [...new Set(days2)],
    highlightedDates: (dates) => dates.map(createDate),
    scrollTime: createDuration,
    slotDuration: createDuration,
    slotMaxTime: createDuration,
    slotMinTime: createDuration
  };
  for (let plugin of plugins) {
    plugin.createParsers?.(parsers);
  }
  return parsers;
}
function diff(options, prevOptions) {
  let diff2 = [];
  for (let key of keys(options)) {
    if (options[key] !== prevOptions[key]) {
      diff2.push([key, options[key]]);
    }
  }
  assign(prevOptions, options);
  return diff2;
}
function dayGrid$1(state) {
  return derived(state.view, ($view) => $view?.startsWith("dayGrid"));
}
function activeRange(state) {
  return derived(
    [state._currentRange, state.firstDay, state.slotMaxTime, state._dayGrid],
    ([$_currentRange, $firstDay, $slotMaxTime, $_dayGrid]) => {
      let start = cloneDate($_currentRange.start);
      let end = cloneDate($_currentRange.end);
      if ($_dayGrid) {
        prevClosestDay(start, $firstDay);
        nextClosestDay(end, $firstDay);
      } else if ($slotMaxTime.days || $slotMaxTime.seconds > DAY_IN_SECONDS) {
        addDuration(subtractDay(end), $slotMaxTime);
        let start2 = subtractDay(cloneDate(end));
        if (start2 < start) {
          start = start2;
        }
      }
      return { start, end };
    }
  );
}
function currentRange(state) {
  return derived(
    [state.date, state.duration, state.firstDay, state._dayGrid],
    ([$date, $duration, $firstDay, $_dayGrid]) => {
      let start = cloneDate($date), end;
      if ($_dayGrid) {
        start.setUTCDate(1);
      } else if ($duration.inWeeks) {
        prevClosestDay(start, $firstDay);
      }
      end = addDuration(cloneDate(start), $duration);
      return { start, end };
    }
  );
}
function viewDates(state) {
  return derived([state._activeRange, state.hiddenDays], ([$_activeRange, $hiddenDays]) => {
    let dates = [];
    let date = setMidnight(cloneDate($_activeRange.start));
    let end = setMidnight(cloneDate($_activeRange.end));
    while (date < end) {
      if (!$hiddenDays.includes(date.getUTCDay())) {
        dates.push(cloneDate(date));
      }
      addDay(date);
    }
    if (!dates.length && $hiddenDays.length && $hiddenDays.length < 7) {
      state.date.update((date2) => {
        while ($hiddenDays.includes(date2.getUTCDay())) {
          addDay(date2);
        }
        return date2;
      });
      dates = get_store_value(state._viewDates);
    }
    return dates;
  });
}
function viewTitle(state) {
  return derived(
    [state.date, state._activeRange, state._intlTitle, state._dayGrid],
    ([$date, $_activeRange, $_intlTitle, $_dayGrid]) => {
      return $_dayGrid ? $_intlTitle.formatRange($date, $date) : $_intlTitle.formatRange($_activeRange.start, subtractDay(cloneDate($_activeRange.end)));
    }
  );
}
function view(state) {
  return derived([state.view, state._viewTitle, state._currentRange, state._activeRange], (args) => createView(...args));
}
function events(state) {
  let _events = writable([]);
  let abortController;
  let fetching = 0;
  let debounceHandle = {};
  derived(
    [state.events, state.eventSources, state._activeRange, state._fetchedRange, state.lazyFetching, state.loading],
    (values, set) => debounce(() => {
      let [$events, $eventSources, $_activeRange, $_fetchedRange, $lazyFetching, $loading] = values;
      if (!$eventSources.length) {
        set($events);
        return;
      }
      if (!$_fetchedRange.start || $_fetchedRange.start > $_activeRange.start || $_fetchedRange.end < $_activeRange.end || !$lazyFetching) {
        if (abortController) {
          abortController.abort();
        }
        abortController = new AbortController();
        if (is_function($loading) && !fetching) {
          $loading(true);
        }
        let stopLoading = () => {
          if (--fetching === 0 && is_function($loading)) {
            $loading(false);
          }
        };
        let events2 = [];
        let failure = (e) => stopLoading();
        let success = (data) => {
          events2 = events2.concat(createEvents(data));
          set(events2);
          stopLoading();
        };
        let startStr = toISOString($_activeRange.start);
        let endStr = toISOString($_activeRange.end);
        for (let source of $eventSources) {
          if (is_function(source.events)) {
            let result = source.events({
              start: toLocalDate($_activeRange.start),
              end: toLocalDate($_activeRange.end),
              startStr,
              endStr
            }, success, failure);
            if (result !== void 0) {
              Promise.resolve(result).then(success, failure);
            }
          } else {
            let params = is_function(source.extraParams) ? source.extraParams() : assign({}, source.extraParams);
            params.start = startStr;
            params.end = endStr;
            params = new URLSearchParams(params);
            let url = source.url, headers = {}, body;
            if (["GET", "HEAD"].includes(source.method)) {
              url += (url.includes("?") ? "&" : "?") + params;
            } else {
              headers["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
              body = String(params);
            }
            fetch(url, { method: source.method, headers, body, signal: abortController.signal, credentials: "same-origin" }).then((response) => response.json()).then(success).catch(failure);
          }
          ++fetching;
        }
        $_fetchedRange.start = $_activeRange.start;
        $_fetchedRange.end = $_activeRange.end;
      }
    }, debounceHandle, state._queue),
    []
  ).subscribe(_events.set);
  return _events;
}
function now() {
  return readable(createDate(), (set) => {
    let interval = setInterval(() => {
      set(createDate());
    }, 1e3);
    return () => clearInterval(interval);
  });
}
function today(state) {
  return derived(state._now, ($_now) => setMidnight(cloneDate($_now)));
}
class State {
  constructor(plugins, input) {
    plugins = plugins || [];
    let options = createOptions(plugins);
    let parsers = createParsers(plugins);
    options = parseOpts(options, parsers);
    input = parseOpts(input, parsers);
    for (let [option, value] of Object.entries(options)) {
      this[option] = writable(value);
    }
    this._queue = writable(/* @__PURE__ */ new Map());
    this._auxiliary = writable([]);
    this._dayGrid = dayGrid$1(this);
    this._currentRange = currentRange(this);
    this._activeRange = activeRange(this);
    this._fetchedRange = writable({ start: void 0, end: void 0 });
    this._events = events(this);
    this._now = now();
    this._today = today(this);
    this._intlEventTime = intlRange(this.locale, this.eventTimeFormat);
    this._intlSlotLabel = intl(this.locale, this.slotLabelFormat);
    this._intlDayHeader = intl(this.locale, this.dayHeaderFormat);
    this._intlTitle = intlRange(this.locale, this.titleFormat);
    this._bodyEl = writable(void 0);
    this._scrollable = writable(false);
    this._viewTitle = viewTitle(this);
    this._viewDates = viewDates(this);
    this._view = view(this);
    this._viewComponent = writable(void 0);
    this._resBgColor = writable(noop);
    this._resTxtColor = writable(noop);
    this._interaction = writable({});
    this._iEvents = writable([null, null]);
    this._iClasses = writable(identity);
    this._iClass = writable(void 0);
    this._set = (key, value) => {
      if (validKey(key, this)) {
        if (parsers[key]) {
          value = parsers[key](value);
        }
        this[key].set(value);
      }
    };
    this._get = (key) => validKey(key, this) ? get_store_value(this[key]) : void 0;
    for (let plugin of plugins) {
      plugin.createStores?.(this);
    }
    if (input.view) {
      this.view.set(input.view);
    }
    let views = /* @__PURE__ */ new Set([...keys(options.views), ...keys(input.views ?? {})]);
    for (let view2 of views) {
      let defOpts = mergeOpts(options, options.views[view2] ?? {});
      let opts = mergeOpts(defOpts, input, input.views?.[view2] ?? {});
      let component = opts.component;
      filterOpts(opts, this);
      for (let key of keys(opts)) {
        let { set, _set = set, ...rest } = this[key];
        this[key] = {
          // Set value in all views
          set: ["buttonText", "theme"].includes(key) ? (value) => {
            if (is_function(value)) {
              let result = value(defOpts[key]);
              opts[key] = result;
              set(set === _set ? result : value);
            } else {
              opts[key] = value;
              set(value);
            }
          } : (value) => {
            opts[key] = value;
            set(value);
          },
          _set,
          ...rest
        };
      }
      this.view.subscribe((newView) => {
        if (newView === view2) {
          this._viewComponent.set(component);
          if (is_function(opts.viewDidMount)) {
            tick().then(() => opts.viewDidMount(get_store_value(this._view)));
          }
          for (let key of keys(opts)) {
            this[key]._set(opts[key]);
          }
        }
      });
    }
  }
}
function parseOpts(opts, parsers) {
  let result = { ...opts };
  for (let key of keys(parsers)) {
    if (key in result) {
      result[key] = parsers[key](result[key]);
    }
  }
  if (opts.views) {
    result.views = {};
    for (let view2 of keys(opts.views)) {
      result.views[view2] = parseOpts(opts.views[view2], parsers);
    }
  }
  return result;
}
function mergeOpts(...args) {
  let result = {};
  for (let opts of args) {
    let override = {};
    for (let key of ["buttonText", "theme"]) {
      if (is_function(opts[key])) {
        override[key] = opts[key](result[key]);
      }
    }
    result = {
      ...result,
      ...opts,
      ...override
    };
  }
  return result;
}
function filterOpts(opts, state) {
  keys(opts).filter((key) => !validKey(key, state) || key == "view").forEach((key) => delete opts[key]);
}
function validKey(key, state) {
  return state.hasOwnProperty(key) && key[0] !== "_";
}
const Buttons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_duration;
  let $$unsubscribe_date;
  let $$unsubscribe_hiddenDays;
  let $_currentRange, $$unsubscribe__currentRange;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__viewTitle;
  let $buttonText, $$unsubscribe_buttonText;
  let $view, $$unsubscribe_view;
  let { buttons } = $$props;
  let { _currentRange, _viewTitle, buttonText, date, duration, hiddenDays, theme, view: view2 } = getContext("state");
  validate_store(_currentRange, "_currentRange");
  $$unsubscribe__currentRange = subscribe(_currentRange, (value) => $_currentRange = value);
  validate_store(_viewTitle, "_viewTitle");
  $$unsubscribe__viewTitle = subscribe(_viewTitle, (value) => value);
  validate_store(buttonText, "buttonText");
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  validate_store(date, "date");
  $$unsubscribe_date = subscribe(date, (value) => value);
  validate_store(duration, "duration");
  $$unsubscribe_duration = subscribe(duration, (value) => value);
  validate_store(hiddenDays, "hiddenDays");
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(view2, "view");
  $$unsubscribe_view = subscribe(view2, (value) => $view = value);
  let today2 = setMidnight(createDate()), isToday;
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
    $$bindings.buttons(buttons);
  isToday = today2 >= $_currentRange.start && today2 < $_currentRange.end || null;
  $$unsubscribe_duration();
  $$unsubscribe_date();
  $$unsubscribe_hiddenDays();
  $$unsubscribe__currentRange();
  $$unsubscribe_theme();
  $$unsubscribe__viewTitle();
  $$unsubscribe_buttonText();
  $$unsubscribe_view();
  return `${each(buttons, (button) => {
    return `${button == "title" ? ` <h2${add_attribute("class", $theme.title, 0)}></h2>` : `${button == "prev" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.prev, 0)}${add_attribute("title", $buttonText.prev, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "next" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.next, 0)}${add_attribute("title", $buttonText.next, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "today" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}" ${isToday ? "disabled" : ""}>${escape($buttonText[button])}</button>` : `${button != "" ? `<button class="${escape($theme.button, true) + escape($view === button ? " " + $theme.active : "", true) + " ec-" + escape(button, true)}">${escape($buttonText[button])}</button>` : ``}`}`}`}`}`;
  })}`;
});
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $headerToolbar, $$unsubscribe_headerToolbar;
  let $theme, $$unsubscribe_theme;
  let { headerToolbar, theme } = getContext("state");
  validate_store(headerToolbar, "headerToolbar");
  $$unsubscribe_headerToolbar = subscribe(headerToolbar, (value) => $headerToolbar = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let sections = { start: [], center: [], end: [] };
  {
    {
      for (let key of Object.keys(sections)) {
        sections[key] = $headerToolbar[key].split(" ").map((group) => group.split(","));
      }
    }
  }
  $$unsubscribe_headerToolbar();
  $$unsubscribe_theme();
  return `<div${add_attribute("class", $theme.toolbar, 0)}>${each(Object.keys(sections), (key) => {
    return `<div>${each(sections[key], (buttons) => {
      return `${buttons.length > 1 ? `<div${add_attribute("class", $theme.buttonGroup, 0)}>${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})} </div>` : `${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})}`}`;
    })} </div>`;
  })}</div>`;
});
const Auxiliary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $datesSet, $$unsubscribe_datesSet;
  let $_activeRange, $$unsubscribe__activeRange;
  let $_auxiliary, $$unsubscribe__auxiliary;
  let { datesSet, _auxiliary, _activeRange, _queue, _view } = getContext("state");
  validate_store(datesSet, "datesSet");
  $$unsubscribe_datesSet = subscribe(datesSet, (value) => $datesSet = value);
  validate_store(_auxiliary, "_auxiliary");
  $$unsubscribe__auxiliary = subscribe(_auxiliary, (value) => $_auxiliary = value);
  validate_store(_activeRange, "_activeRange");
  $$unsubscribe__activeRange = subscribe(_activeRange, (value) => $_activeRange = value);
  validate_store(_view, "_view");
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  let debounceHandle = {};
  function runDatesSet(_activeRange2) {
    if (is_function($datesSet)) {
      debounce(
        () => $datesSet({
          start: toLocalDate(_activeRange2.start),
          end: toLocalDate(_activeRange2.end),
          startStr: toISOString(_activeRange2.start),
          endStr: toISOString(_activeRange2.end),
          view: toViewWithLocalDates($_view)
        }),
        debounceHandle,
        _queue
      );
    }
  }
  {
    runDatesSet($_activeRange);
  }
  $$unsubscribe__view();
  $$unsubscribe_datesSet();
  $$unsubscribe__activeRange();
  $$unsubscribe__auxiliary();
  return `${each($_auxiliary, (component) => {
    return `${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
  })}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__bodyEl;
  let $_scrollable, $$unsubscribe__scrollable;
  let $$unsubscribe__queue;
  let $_interaction, $$unsubscribe__interaction;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let $_iClass, $$unsubscribe__iClass;
  let $height, $$unsubscribe_height;
  let $_viewComponent, $$unsubscribe__viewComponent;
  let { plugins = [] } = $$props;
  let { options = {} } = $$props;
  let component = get_current_component();
  let state = new State(plugins, options);
  setContext("state", state);
  let { _viewComponent, _bodyEl, _interaction, _iClass, _events, _queue, _scrollable, events: events2, eventSources, height, theme } = state;
  validate_store(_viewComponent, "_viewComponent");
  $$unsubscribe__viewComponent = subscribe(_viewComponent, (value) => $_viewComponent = value);
  validate_store(_bodyEl, "_bodyEl");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  validate_store(_iClass, "_iClass");
  $$unsubscribe__iClass = subscribe(_iClass, (value) => $_iClass = value);
  validate_store(_events, "_events");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  validate_store(_queue, "_queue");
  $$unsubscribe__queue = subscribe(_queue, (value) => value);
  validate_store(_scrollable, "_scrollable");
  $$unsubscribe__scrollable = subscribe(_scrollable, (value) => $_scrollable = value);
  validate_store(height, "height");
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let prevOptions = { ...options };
  function setOption(name, value) {
    state._set(name, value);
    return this;
  }
  function getOption(name) {
    let value = state._get(name);
    return value instanceof Date ? toLocalDate(value) : value;
  }
  function refetchEvents() {
    state._fetchedRange.set({ start: void 0, end: void 0 });
    return this;
  }
  function getEvents() {
    return $_events.map(toEventWithLocalDates);
  }
  function getEventById(id) {
    for (let event of $_events) {
      if (event.id == id) {
        return toEventWithLocalDates(event);
      }
    }
    return null;
  }
  function addEvent(event) {
    $_events.push(createEvents([event])[0]);
    _events.set($_events);
    return this;
  }
  function updateEvent(event) {
    for (let e of $_events) {
      if (e.id == event.id) {
        assign(e, createEvents([event])[0]);
        _events.set($_events);
        break;
      }
    }
    return this;
  }
  function removeEventById(id) {
    let idx = $_events.findIndex((event) => event.id == id);
    if (idx >= 0) {
      $_events.splice(idx, 1);
      _events.set($_events);
    }
    return this;
  }
  function getView() {
    return toViewWithLocalDates(get_store_value(state._view));
  }
  function unselect() {
    if ($_interaction.action) {
      $_interaction.action.unselect();
    }
    return this;
  }
  function dateFromPoint(x, y) {
    let dayEl = getElementWithPayload(x, y);
    return dayEl ? getPayload(dayEl)(y) : null;
  }
  function destroy() {
    destroy_component(component, true);
  }
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.setOption === void 0 && $$bindings.setOption && setOption !== void 0)
    $$bindings.setOption(setOption);
  if ($$props.getOption === void 0 && $$bindings.getOption && getOption !== void 0)
    $$bindings.getOption(getOption);
  if ($$props.refetchEvents === void 0 && $$bindings.refetchEvents && refetchEvents !== void 0)
    $$bindings.refetchEvents(refetchEvents);
  if ($$props.getEvents === void 0 && $$bindings.getEvents && getEvents !== void 0)
    $$bindings.getEvents(getEvents);
  if ($$props.getEventById === void 0 && $$bindings.getEventById && getEventById !== void 0)
    $$bindings.getEventById(getEventById);
  if ($$props.addEvent === void 0 && $$bindings.addEvent && addEvent !== void 0)
    $$bindings.addEvent(addEvent);
  if ($$props.updateEvent === void 0 && $$bindings.updateEvent && updateEvent !== void 0)
    $$bindings.updateEvent(updateEvent);
  if ($$props.removeEventById === void 0 && $$bindings.removeEventById && removeEventById !== void 0)
    $$bindings.removeEventById(removeEventById);
  if ($$props.getView === void 0 && $$bindings.getView && getView !== void 0)
    $$bindings.getView(getView);
  if ($$props.unselect === void 0 && $$bindings.unselect && unselect !== void 0)
    $$bindings.unselect(unselect);
  if ($$props.dateFromPoint === void 0 && $$bindings.dateFromPoint && dateFromPoint !== void 0)
    $$bindings.dateFromPoint(dateFromPoint);
  if ($$props.destroy === void 0 && $$bindings.destroy && destroy !== void 0)
    $$bindings.destroy(destroy);
  {
    for (let [name, value] of diff(options, prevOptions)) {
      setOption(name, value);
    }
  }
  $$unsubscribe__bodyEl();
  $$unsubscribe__scrollable();
  $$unsubscribe__queue();
  $$unsubscribe__interaction();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  $$unsubscribe__iClass();
  $$unsubscribe_height();
  $$unsubscribe__viewComponent();
  return `<div class="${escape($theme.calendar, true) + " " + escape($theme.view, true) + escape($_scrollable ? " " + $theme.withScroll : "", true) + escape($_iClass ? " " + $theme[$_iClass] : "", true)}"${add_styles({ "height": $height })}>${validate_component(Toolbar, "Toolbar").$$render($$result, {}, {}, {})} ${validate_component($_viewComponent || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> ${validate_component(Auxiliary, "Auxiliary").$$render($$result, {}, {}, {})} `;
});
function times(state) {
  return derived(
    [state._slotTimeLimits, state._intlSlotLabel, state.slotDuration],
    ([$_slotTimeLimits, $_intlSlotLabel, $slotDuration]) => {
      let compact = $slotDuration.seconds >= 3600;
      let times2 = [];
      let date = setMidnight(createDate());
      let end = cloneDate(date);
      let i = 1;
      addDuration(date, $_slotTimeLimits.min);
      addDuration(end, $_slotTimeLimits.max);
      while (date < end) {
        times2.push(times2.length && (i || compact) ? $_intlSlotLabel.format(date) : "");
        addDuration(date, $slotDuration);
        i = 1 - i;
      }
      return times2;
    }
  );
}
function slotTimeLimits(state) {
  return derived(
    [state._events, state._viewDates, state.flexibleSlotTimeLimits, state.slotMinTime, state.slotMaxTime],
    ([$_events, $_viewDates, $flexibleSlotTimeLimits, $slotMinTime, $slotMaxTime]) => {
      let min$1 = createDuration($slotMinTime);
      let max$1 = createDuration($slotMaxTime);
      if ($flexibleSlotTimeLimits) {
        let minMin = createDuration(min(min$1.seconds, max(0, max$1.seconds - DAY_IN_SECONDS)));
        let maxMax = createDuration(max(max$1.seconds, minMin.seconds + DAY_IN_SECONDS));
        let filter = is_function($flexibleSlotTimeLimits?.eventFilter) ? $flexibleSlotTimeLimits.eventFilter : (event) => !bgEvent(event.display);
        loop:
          for (let date of $_viewDates) {
            let start = addDuration(cloneDate(date), min$1);
            let end = addDuration(cloneDate(date), max$1);
            let minStart = addDuration(cloneDate(date), minMin);
            let maxEnd = addDuration(cloneDate(date), maxMax);
            for (let event of $_events) {
              if (!event.allDay && filter(event) && event.start < maxEnd && event.end > minStart) {
                if (event.start < start) {
                  let seconds = max((event.start - date) / 1e3, minMin.seconds);
                  if (seconds < min$1.seconds) {
                    min$1.seconds = seconds;
                  }
                }
                if (event.end > end) {
                  let seconds = min((event.end - date) / 1e3, maxMax.seconds);
                  if (seconds > max$1.seconds) {
                    max$1.seconds = seconds;
                  }
                }
                if (min$1.seconds === minMin.seconds && max$1.seconds === maxMax.seconds) {
                  break loop;
                }
              }
            }
          }
      }
      return { min: min$1, max: max$1 };
    }
  );
}
function groupEventChunks(chunks) {
  if (!chunks.length) {
    return;
  }
  sortEventChunks(chunks);
  let group = {
    columns: [],
    end: chunks[0].end
  };
  for (let chunk of chunks) {
    let c = 0;
    if (chunk.start < group.end) {
      for (; c < group.columns.length; ++c) {
        if (group.columns[c][group.columns[c].length - 1].end <= chunk.start) {
          break;
        }
      }
      if (chunk.end > group.end) {
        group.end = chunk.end;
      }
    } else {
      group = {
        columns: [],
        end: chunk.end
      };
    }
    if (group.columns.length < c + 1) {
      group.columns.push([]);
    }
    group.columns[c].push(chunk);
    chunk.group = group;
    chunk.column = c;
  }
}
function createAllDayContent(allDayContent) {
  let text = "all-day";
  let content;
  if (allDayContent) {
    content = is_function(allDayContent) ? allDayContent({ text }) : allDayContent;
    if (typeof content === "string") {
      content = { html: content };
    }
  } else {
    content = {
      html: text
    };
  }
  return content;
}
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allDayContent, $$unsubscribe_allDayContent;
  let $theme, $$unsubscribe_theme;
  let $_times, $$unsubscribe__times;
  let { allDayContent, theme, _times } = getContext("state");
  validate_store(allDayContent, "allDayContent");
  $$unsubscribe_allDayContent = subscribe(allDayContent, (value) => $allDayContent = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_times, "_times");
  $$unsubscribe__times = subscribe(_times, (value) => $_times = value);
  createAllDayContent($allDayContent);
  $$unsubscribe_allDayContent();
  $$unsubscribe_theme();
  $$unsubscribe__times();
  return `<div${add_attribute("class", $theme.sidebar, 0)}><div${add_attribute("class", $theme.sidebarTitle, 0)}></div> ${each($_times, (time) => {
    return `<div${add_attribute("class", $theme.time, 0)}></div>`;
  })}</div> <div${add_attribute("class", $theme.days, 0)}><div${add_attribute("class", $theme.lines, 0)}>${slots.lines ? slots.lines({}) : ``}</div> ${slots.default ? slots.default({}) : ``}</div>`;
});
const Body$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_slotHeight;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $$unsubscribe_scrollTime;
  let $$unsubscribe__viewDates;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $_times, $$unsubscribe__times;
  let $_bodyEl, $$unsubscribe__bodyEl;
  let $theme, $$unsubscribe_theme;
  let { _bodyEl, _viewDates, _slotTimeLimits, _times, scrollTime, slotDuration, slotHeight, theme } = getContext("state");
  validate_store(_bodyEl, "_bodyEl");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => $_bodyEl = value);
  validate_store(_viewDates, "_viewDates");
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => value);
  validate_store(_slotTimeLimits, "_slotTimeLimits");
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  validate_store(_times, "_times");
  $$unsubscribe__times = subscribe(_times, (value) => $_times = value);
  validate_store(scrollTime, "scrollTime");
  $$unsubscribe_scrollTime = subscribe(scrollTime, (value) => value);
  validate_store(slotDuration, "slotDuration");
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  validate_store(slotHeight, "slotHeight");
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let el;
  let compact;
  let lines = [];
  set_store_value(_bodyEl, $_bodyEl = el, $_bodyEl);
  {
    {
      compact = $slotDuration.seconds >= 3600;
      lines.length = $_times.length;
      $_slotTimeLimits.min.seconds;
    }
  }
  $$unsubscribe_slotHeight();
  $$unsubscribe_slotDuration();
  $$unsubscribe_scrollTime();
  $$unsubscribe__viewDates();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe__times();
  $$unsubscribe__bodyEl();
  $$unsubscribe_theme();
  return `<div class="${escape($theme.body, true) + escape(compact ? " " + $theme.compact : "", true)}"${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.content, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    lines: () => {
      return `${each(lines, (line) => {
        return `<div${add_attribute("class", $theme.line, 0)}></div>`;
      })} `;
    },
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}</div></div>`;
});
const Event$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $slotEventOverlap, $$unsubscribe_slotEventOverlap;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $_resTxtColor, $$unsubscribe__resTxtColor;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $_resBgColor, $$unsubscribe__resBgColor;
  let $slotHeight, $$unsubscribe_slotHeight;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $$unsubscribe_eventClick;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let $_interaction, $$unsubscribe__interaction;
  let { date } = $$props;
  let { chunk } = $$props;
  let { displayEventEnd, eventBackgroundColor, eventTextColor, eventColor, eventContent, eventClick, eventDidMount, eventClassNames, eventMouseEnter, eventMouseLeave, slotEventOverlap, slotDuration, slotHeight, theme, _view, _intlEventTime, _interaction, _iClasses, _resBgColor, _resTxtColor, _slotTimeLimits } = getContext("state");
  validate_store(displayEventEnd, "displayEventEnd");
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  validate_store(eventBackgroundColor, "eventBackgroundColor");
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  validate_store(eventTextColor, "eventTextColor");
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  validate_store(eventColor, "eventColor");
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  validate_store(eventContent, "eventContent");
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  validate_store(eventClick, "eventClick");
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => value);
  validate_store(eventDidMount, "eventDidMount");
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  validate_store(eventClassNames, "eventClassNames");
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  validate_store(eventMouseEnter, "eventMouseEnter");
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  validate_store(eventMouseLeave, "eventMouseLeave");
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  validate_store(slotEventOverlap, "slotEventOverlap");
  $$unsubscribe_slotEventOverlap = subscribe(slotEventOverlap, (value) => $slotEventOverlap = value);
  validate_store(slotDuration, "slotDuration");
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  validate_store(slotHeight, "slotHeight");
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => $slotHeight = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_view, "_view");
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  validate_store(_intlEventTime, "_intlEventTime");
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  validate_store(_iClasses, "_iClasses");
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  validate_store(_resBgColor, "_resBgColor");
  $$unsubscribe__resBgColor = subscribe(_resBgColor, (value) => $_resBgColor = value);
  validate_store(_resTxtColor, "_resTxtColor");
  $$unsubscribe__resTxtColor = subscribe(_resTxtColor, (value) => $_resTxtColor = value);
  validate_store(_slotTimeLimits, "_slotTimeLimits");
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let el;
  let event;
  let display;
  let classes;
  let style;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  event = chunk.event;
  {
    {
      display = event.display;
      let step = $slotDuration.seconds / 60;
      let offset = $_slotTimeLimits.min.seconds / 60;
      let start = (chunk.start - date) / 1e3 / 60;
      let end = (chunk.end - date) / 1e3 / 60;
      let top = (start - offset) / step * $slotHeight;
      let height = (end - start) / step * $slotHeight;
      let maxHeight = ($_slotTimeLimits.max.seconds / 60 - start) / step * $slotHeight;
      let bgColor = event.backgroundColor || $_resBgColor(event) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || $_resTxtColor(event) || $eventTextColor;
      style = `top:${top}px;min-height:${height}px;height:${height}px;max-height:${maxHeight}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      if (!bgEvent(display) && !helperEvent(display) || ghostEvent(display)) {
        style += `z-index:${chunk.column + 1};left:${100 / chunk.group.columns.length * chunk.column}%;width:${100 / chunk.group.columns.length * ($slotEventOverlap ? 0.5 * (1 + chunk.group.columns.length - chunk.column) : 1)}%;`;
      }
      classes = [
        bgEvent(display) ? $theme.bgEvent : $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  $$unsubscribe__view();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_slotEventOverlap();
  $$unsubscribe_eventTextColor();
  $$unsubscribe__resTxtColor();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe__resBgColor();
  $$unsubscribe_slotHeight();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_slotDuration();
  $$unsubscribe_eventClick();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  $$unsubscribe__interaction();
  return `  <div${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</div>`;
});
const NowIndicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $slotHeight, $$unsubscribe_slotHeight;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $slotDuration, $$unsubscribe_slotDuration;
  let $_today, $$unsubscribe__today;
  let $_now, $$unsubscribe__now;
  let $theme, $$unsubscribe_theme;
  let { slotDuration, slotHeight, theme, _now, _today, _slotTimeLimits } = getContext("state");
  validate_store(slotDuration, "slotDuration");
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => $slotDuration = value);
  validate_store(slotHeight, "slotHeight");
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => $slotHeight = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_now, "_now");
  $$unsubscribe__now = subscribe(_now, (value) => $_now = value);
  validate_store(_today, "_today");
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  validate_store(_slotTimeLimits, "_slotTimeLimits");
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let start;
  let top = 0;
  start = ($_now - $_today) / 1e3 / 60;
  {
    {
      let step = $slotDuration.seconds / 60;
      let offset = $_slotTimeLimits.min.seconds / 60;
      top = (start - offset) / step * $slotHeight;
    }
  }
  $$unsubscribe_slotHeight();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_slotDuration();
  $$unsubscribe__today();
  $$unsubscribe__now();
  $$unsubscribe_theme();
  return `<div${add_attribute("class", $theme.nowIndicator, 0)} style="${"top:" + escape(top, true) + "px"}"></div>`;
});
const Day$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_slotHeight;
  let $$unsubscribe_slotDuration;
  let $_slotTimeLimits, $$unsubscribe__slotTimeLimits;
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $_today, $$unsubscribe__today;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let $nowIndicator, $$unsubscribe_nowIndicator;
  let { date } = $$props;
  let { resource = void 0 } = $$props;
  let { _events, _iEvents, highlightedDates, nowIndicator, slotDuration, slotHeight, theme, _interaction, _today, _slotTimeLimits } = getContext("state");
  validate_store(_events, "_events");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  validate_store(_iEvents, "_iEvents");
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  validate_store(highlightedDates, "highlightedDates");
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  validate_store(nowIndicator, "nowIndicator");
  $$unsubscribe_nowIndicator = subscribe(nowIndicator, (value) => $nowIndicator = value);
  validate_store(slotDuration, "slotDuration");
  $$unsubscribe_slotDuration = subscribe(slotDuration, (value) => value);
  validate_store(slotHeight, "slotHeight");
  $$unsubscribe_slotHeight = subscribe(slotHeight, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  validate_store(_today, "_today");
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  validate_store(_slotTimeLimits, "_slotTimeLimits");
  $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, (value) => $_slotTimeLimits = value);
  let el;
  let chunks, bgChunks, iChunks = [];
  let isToday, highlight;
  let start, end;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  {
    {
      start = addDuration(cloneDate(date), $_slotTimeLimits.min);
      end = addDuration(cloneDate(date), $_slotTimeLimits.max);
    }
  }
  {
    {
      chunks = [];
      bgChunks = [];
      for (let event of $_events) {
        if (!event.allDay && eventIntersects(event, start, end, resource, true)) {
          let chunk = createEventChunk(event, start, end);
          switch (event.display) {
            case "background":
              bgChunks.push(chunk);
              break;
            default:
              chunks.push(chunk);
          }
        }
      }
      groupEventChunks(chunks);
    }
  }
  iChunks = $_iEvents.map((event) => event && eventIntersects(event, start, end, resource, true) ? createEventChunk(event, start, end) : null);
  isToday = datesEqual(date, $_today);
  highlight = $highlightedDates.some((d) => datesEqual(d, date));
  $$unsubscribe_slotHeight();
  $$unsubscribe_slotDuration();
  $$unsubscribe__slotTimeLimits();
  $$unsubscribe_highlightedDates();
  $$unsubscribe__today();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  $$unsubscribe_nowIndicator();
  return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}"${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.bgEvents, 0)}>${each(bgChunks, (chunk) => {
    return `${validate_component(Event$2, "Event").$$render($$result, { date, chunk }, {}, {})}`;
  })}</div> <div${add_attribute("class", $theme.events, 0)}> ${iChunks[1] ? `${validate_component(Event$2, "Event").$$render($$result, { date, chunk: iChunks[1] }, {}, {})}` : ``} ${each(chunks, (chunk) => {
    return `${validate_component(Event$2, "Event").$$render($$result, { date, chunk }, {}, {})}`;
  })}  ${iChunks[0] && !iChunks[0].event.allDay ? `${validate_component(Event$2, "Event").$$render($$result, { date, chunk: iChunks[0] }, {}, {})}` : ``}</div> <div${add_attribute("class", $theme.extra, 0)}> ${$nowIndicator && isToday ? `${validate_component(NowIndicator, "NowIndicator").$$render($$result, {}, {}, {})}` : ``}</div></div>`;
});
const Event$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $_resTxtColor, $$unsubscribe__resTxtColor;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $_resBgColor, $$unsubscribe__resBgColor;
  let $$unsubscribe_eventClick;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let $_interaction, $$unsubscribe__interaction;
  let { chunk } = $$props;
  let { longChunks = {} } = $$props;
  let { displayEventEnd, eventBackgroundColor, eventTextColor, eventClick, eventColor, eventContent, eventClassNames, eventDidMount, eventMouseEnter, eventMouseLeave, theme, _view, _intlEventTime, _interaction, _iClasses, _resBgColor, _resTxtColor } = getContext("state");
  validate_store(displayEventEnd, "displayEventEnd");
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  validate_store(eventBackgroundColor, "eventBackgroundColor");
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  validate_store(eventTextColor, "eventTextColor");
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  validate_store(eventClick, "eventClick");
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => value);
  validate_store(eventColor, "eventColor");
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  validate_store(eventContent, "eventContent");
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  validate_store(eventClassNames, "eventClassNames");
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  validate_store(eventDidMount, "eventDidMount");
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  validate_store(eventMouseEnter, "eventMouseEnter");
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  validate_store(eventMouseLeave, "eventMouseLeave");
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_view, "_view");
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  validate_store(_intlEventTime, "_intlEventTime");
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  validate_store(_iClasses, "_iClasses");
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  validate_store(_resBgColor, "_resBgColor");
  $$unsubscribe__resBgColor = subscribe(_resBgColor, (value) => $_resBgColor = value);
  validate_store(_resTxtColor, "_resTxtColor");
  $$unsubscribe__resTxtColor = subscribe(_resTxtColor, (value) => $_resTxtColor = value);
  createEventDispatcher();
  let el;
  let event;
  let classes;
  let style;
  let margin = 1;
  function reposition() {
    {
      return;
    }
  }
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  event = chunk.event;
  {
    {
      event.display;
      let bgColor = event.backgroundColor || $_resBgColor(event) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || $_resTxtColor(event) || $eventTextColor;
      style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);margin-top:${margin}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      classes = [
        $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  $$unsubscribe__view();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_eventTextColor();
  $$unsubscribe__resTxtColor();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe__resBgColor();
  $$unsubscribe_eventClick();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  $$unsubscribe__interaction();
  return `  <div${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</div>`;
});
const Day$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $_today, $$unsubscribe__today;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let { date } = $$props;
  let { chunks } = $$props;
  let { longChunks } = $$props;
  let { iChunks = [] } = $$props;
  let { resource = void 0 } = $$props;
  let { highlightedDates, theme, _interaction, _today } = getContext("state");
  validate_store(highlightedDates, "highlightedDates");
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  validate_store(_today, "_today");
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  let el;
  let dayChunks;
  let isToday;
  let highlight;
  let refs = [];
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunks === void 0 && $$bindings.chunks && chunks !== void 0)
    $$bindings.chunks(chunks);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.iChunks === void 0 && $$bindings.iChunks && iChunks !== void 0)
    $$bindings.iChunks(iChunks);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        dayChunks = [];
        for (let chunk of chunks) {
          if (datesEqual(chunk.date, date)) {
            dayChunks.push(chunk);
          }
        }
      }
    }
    isToday = datesEqual(date, $_today);
    highlight = $highlightedDates.some((d) => datesEqual(d, date));
    $$rendered = `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}"${add_attribute("this", el, 0)}> ${iChunks[0] && datesEqual(iChunks[0].date, date) ? `<div class="${escape($theme.events, true) + " " + escape($theme.preview, true)}">${validate_component(Event$1, "Event").$$render($$result, { chunk: iChunks[0] }, {}, {})}</div>` : ``} <div${add_attribute("class", $theme.events, 0)}>${each(dayChunks, (chunk, i) => {
      return `${validate_component(Event$1, "Event").$$render(
        $$result,
        { chunk, longChunks, this: refs[i] },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div></div> `;
  } while (!$$settled);
  $$unsubscribe_highlightedDates();
  $$unsubscribe__today();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  return $$rendered;
});
const Week$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let { dates } = $$props;
  let { resource = void 0 } = $$props;
  let { _events, _iEvents, hiddenDays, theme } = getContext("state");
  validate_store(_events, "_events");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  validate_store(_iEvents, "_iEvents");
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  validate_store(hiddenDays, "hiddenDays");
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  let chunks, longChunks, iChunks = [];
  let start;
  let end;
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.resource === void 0 && $$bindings.resource && resource !== void 0)
    $$bindings.resource(resource);
  {
    {
      start = dates[0];
      end = addDay(cloneDate(dates[dates.length - 1]));
    }
  }
  {
    {
      chunks = [];
      for (let event of $_events) {
        if (event.allDay && event.display !== "background" && eventIntersects(event, start, end, resource)) {
          let chunk = createEventChunk(event, start, end);
          chunks.push(chunk);
        }
      }
      longChunks = prepareEventChunks(chunks, $hiddenDays);
    }
  }
  iChunks = $_iEvents.map((event) => {
    let chunk;
    if (event && event.allDay && eventIntersects(event, start, end, resource)) {
      chunk = createEventChunk(event, start, end);
      prepareEventChunks([chunk], $hiddenDays);
    } else {
      chunk = null;
    }
    return chunk;
  });
  $$unsubscribe_hiddenDays();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  return `${each(dates, (date) => {
    return `${validate_component(Day$1, "Day").$$render(
      $$result,
      {
        date,
        chunks,
        longChunks,
        iChunks,
        resource
      },
      {},
      {}
    )}`;
  })}`;
});
const View$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $_viewDates, $$unsubscribe__viewDates;
  let $$unsubscribe__intlDayHeader;
  let $allDaySlot, $$unsubscribe_allDaySlot;
  let { _viewDates, _intlDayHeader, allDaySlot, theme } = getContext("state");
  validate_store(_viewDates, "_viewDates");
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => $_viewDates = value);
  validate_store(_intlDayHeader, "_intlDayHeader");
  $$unsubscribe__intlDayHeader = subscribe(_intlDayHeader, (value) => value);
  validate_store(allDaySlot, "allDaySlot");
  $$unsubscribe_allDaySlot = subscribe(allDaySlot, (value) => $allDaySlot = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  $$unsubscribe__viewDates();
  $$unsubscribe__intlDayHeader();
  $$unsubscribe_allDaySlot();
  return `<div${add_attribute("class", $theme.header, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${each($_viewDates, (date) => {
        return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true)}"></div>`;
      })}`;
    }
  })} <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div> ${$allDaySlot ? `<div${add_attribute("class", $theme.allDay, 0)}><div${add_attribute("class", $theme.content, 0)}>${validate_component(Section, "Section").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Week$1, "Week").$$render($$result, { dates: $_viewDates }, {}, {})}`;
    }
  })} <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div></div>` : ``} ${validate_component(Body$1, "Body").$$render($$result, {}, {}, {
    default: () => {
      return `${each($_viewDates, (date) => {
        return `${validate_component(Day$2, "Day").$$render($$result, { date }, {}, {})}`;
      })}`;
    }
  })}`;
});
const TimeGrid = {
  createOptions(options) {
    options.buttonText.timeGridDay = "day";
    options.buttonText.timeGridWeek = "week";
    options.view = "timeGridWeek";
    options.views.timeGridDay = {
      buttonText: btnTextDay,
      component: View$1,
      dayHeaderFormat: { weekday: "long" },
      duration: { days: 1 },
      theme: themeView("ec-time-grid ec-day-view"),
      titleFormat: { year: "numeric", month: "long", day: "numeric" }
    };
    options.views.timeGridWeek = {
      buttonText: btnTextWeek,
      component: View$1,
      duration: { weeks: 1 },
      theme: themeView("ec-time-grid ec-week-view")
    };
  },
  createStores(state) {
    state._slotTimeLimits = slotTimeLimits(state);
    state._times = times(state);
  }
};
function days(state) {
  return derived([state.date, state.firstDay, state.hiddenDays], ([$date, $firstDay, $hiddenDays]) => {
    let days2 = [];
    let day = cloneDate($date);
    let max2 = 7;
    while (day.getUTCDay() !== $firstDay && max2) {
      subtractDay(day);
      --max2;
    }
    for (let i = 0; i < 7; ++i) {
      if (!$hiddenDays.includes(day.getUTCDay())) {
        days2.push(cloneDate(day));
      }
      addDay(day);
    }
    return days2;
  });
}
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $_days, $$unsubscribe__days;
  let $$unsubscribe__intlDayHeader;
  let { theme, _intlDayHeader, _days } = getContext("state");
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_intlDayHeader, "_intlDayHeader");
  $$unsubscribe__intlDayHeader = subscribe(_intlDayHeader, (value) => value);
  validate_store(_days, "_days");
  $$unsubscribe__days = subscribe(_days, (value) => $_days = value);
  $$unsubscribe_theme();
  $$unsubscribe__days();
  $$unsubscribe__intlDayHeader();
  return `<div${add_attribute("class", $theme.header, 0)}><div${add_attribute("class", $theme.days, 0)}>${each($_days, (day) => {
    return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[day.getUTCDay()], true)}"></div>`;
  })}</div> <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div>`;
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $dayMaxEvents, $$unsubscribe_dayMaxEvents;
  let $_bodyEl, $$unsubscribe__bodyEl;
  let { dayMaxEvents, _bodyEl, theme } = getContext("state");
  validate_store(dayMaxEvents, "dayMaxEvents");
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => $dayMaxEvents = value);
  validate_store(_bodyEl, "_bodyEl");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => $_bodyEl = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__bodyEl();
  return `<div class="${escape($theme.body, true) + escape($dayMaxEvents === true ? " " + $theme.uniform : "", true)}"${add_attribute("this", $_bodyEl, 0)}><div${add_attribute("class", $theme.content, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__hiddenEvents;
  let $$unsubscribe_dayMaxEvents;
  let $$unsubscribe__popupDate;
  let $_interaction, $$unsubscribe__interaction;
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $_resTxtColor, $$unsubscribe__resTxtColor;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $_resBgColor, $$unsubscribe__resBgColor;
  let $$unsubscribe_eventClick;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let { chunk } = $$props;
  let { longChunks = {} } = $$props;
  let { inPopup = false } = $$props;
  let { dayMaxEvents, displayEventEnd, eventBackgroundColor, eventTextColor, eventClick, eventColor, eventContent, eventClassNames, eventDidMount, eventMouseEnter, eventMouseLeave, theme, _view, _intlEventTime, _interaction, _iClasses, _resBgColor, _resTxtColor, _hiddenEvents, _popupDate } = getContext("state");
  validate_store(dayMaxEvents, "dayMaxEvents");
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => value);
  validate_store(displayEventEnd, "displayEventEnd");
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  validate_store(eventBackgroundColor, "eventBackgroundColor");
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  validate_store(eventTextColor, "eventTextColor");
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  validate_store(eventClick, "eventClick");
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => value);
  validate_store(eventColor, "eventColor");
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  validate_store(eventContent, "eventContent");
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  validate_store(eventClassNames, "eventClassNames");
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  validate_store(eventDidMount, "eventDidMount");
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  validate_store(eventMouseEnter, "eventMouseEnter");
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  validate_store(eventMouseLeave, "eventMouseLeave");
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_view, "_view");
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  validate_store(_intlEventTime, "_intlEventTime");
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  validate_store(_iClasses, "_iClasses");
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  validate_store(_resBgColor, "_resBgColor");
  $$unsubscribe__resBgColor = subscribe(_resBgColor, (value) => $_resBgColor = value);
  validate_store(_resTxtColor, "_resTxtColor");
  $$unsubscribe__resTxtColor = subscribe(_resTxtColor, (value) => $_resTxtColor = value);
  validate_store(_hiddenEvents, "_hiddenEvents");
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => value);
  validate_store(_popupDate, "_popupDate");
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => value);
  let el;
  let event;
  let classes;
  let style;
  let margin = 1;
  function reposition() {
    {
      return;
    }
  }
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.inPopup === void 0 && $$bindings.inPopup && inPopup !== void 0)
    $$bindings.inPopup(inPopup);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  event = chunk.event;
  {
    {
      event.display;
      let bgColor = event.backgroundColor || $_resBgColor(event) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || $_resTxtColor(event) || $eventTextColor;
      style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);margin-top:${margin}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      classes = [
        $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__popupDate();
  $$unsubscribe__interaction();
  $$unsubscribe__view();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_eventTextColor();
  $$unsubscribe__resTxtColor();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe__resBgColor();
  $$unsubscribe_eventClick();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  return `  <div${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</div>`;
});
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__interaction;
  let $$unsubscribe__popupDate;
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__intlDayPopover;
  let $buttonText, $$unsubscribe_buttonText;
  let { buttonText, theme, _interaction, _intlDayPopover, _popupDate, _popupChunks } = getContext("state");
  validate_store(buttonText, "buttonText");
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  validate_store(_intlDayPopover, "_intlDayPopover");
  $$unsubscribe__intlDayPopover = subscribe(_intlDayPopover, (value) => value);
  validate_store(_popupDate, "_popupDate");
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => value);
  validate_store(_popupChunks, "_popupChunks");
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  let el;
  let style = "";
  $$unsubscribe__interaction();
  $$unsubscribe__popupDate();
  $$unsubscribe__popupChunks();
  $$unsubscribe_theme();
  $$unsubscribe__intlDayPopover();
  $$unsubscribe_buttonText();
  return `<div${add_attribute("class", $theme.popup, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.dayHead, 0)}><span></span>  <a role="button" tabindex="0"${add_attribute("aria-label", $buttonText.close, 0)}>×</a></div> <div${add_attribute("class", $theme.events, 0)}>${each($_popupChunks, (chunk) => {
    return `${validate_component(Event, "Event").$$render($$result, { chunk, inPopup: true }, {}, {})}`;
  })}</div></div>`;
});
const Day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $_popupDate, $$unsubscribe__popupDate;
  let $moreLinkContent, $$unsubscribe_moreLinkContent;
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $currentDate, $$unsubscribe_currentDate;
  let $_today, $$unsubscribe__today;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let $$unsubscribe__intlDayCell;
  let { date } = $$props;
  let { chunks } = $$props;
  let { longChunks } = $$props;
  let { iChunks = [] } = $$props;
  let { date: currentDate, dayMaxEvents, highlightedDates, moreLinkContent, theme, _hiddenEvents, _intlDayCell, _popupDate, _popupChunks, _today, _interaction, _queue } = getContext("state");
  validate_store(currentDate, "currentDate");
  $$unsubscribe_currentDate = subscribe(currentDate, (value) => $currentDate = value);
  validate_store(highlightedDates, "highlightedDates");
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  validate_store(moreLinkContent, "moreLinkContent");
  $$unsubscribe_moreLinkContent = subscribe(moreLinkContent, (value) => $moreLinkContent = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(_hiddenEvents, "_hiddenEvents");
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  validate_store(_intlDayCell, "_intlDayCell");
  $$unsubscribe__intlDayCell = subscribe(_intlDayCell, (value) => value);
  validate_store(_popupDate, "_popupDate");
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => $_popupDate = value);
  validate_store(_popupChunks, "_popupChunks");
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  validate_store(_today, "_today");
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  validate_store(_interaction, "_interaction");
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  let el;
  let dayChunks;
  let isToday;
  let otherMonth;
  let highlight;
  let hiddenEvents = /* @__PURE__ */ new Set();
  let showPopup;
  let refs = [];
  function setPopupChunks() {
    let nextDay = addDay(cloneDate(date));
    let chunks2 = dayChunks.concat(longChunks[date.getTime()]?.chunks || []);
    set_store_value(_popupChunks, $_popupChunks = chunks2.map((chunk) => assign({}, chunk, createEventChunk(chunk.event, date, nextDay), { days: 1, dates: [date] })).sort((a, b) => a.top - b.top), $_popupChunks);
  }
  function reposition() {
    refs.length = dayChunks.length;
    for (let ref of refs) {
      ref?.reposition?.();
    }
  }
  let debounceHandle = {};
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunks === void 0 && $$bindings.chunks && chunks !== void 0)
    $$bindings.chunks(chunks);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.iChunks === void 0 && $$bindings.iChunks && iChunks !== void 0)
    $$bindings.iChunks(iChunks);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        dayChunks = [];
        hiddenEvents.clear();
        hiddenEvents = hiddenEvents;
        for (let chunk of chunks) {
          if (datesEqual(chunk.date, date)) {
            dayChunks.push(chunk);
          }
        }
      }
    }
    set_store_value(_hiddenEvents, $_hiddenEvents[date.getTime()] = hiddenEvents, $_hiddenEvents);
    isToday = datesEqual(date, $_today);
    {
      {
        otherMonth = date.getUTCMonth() !== $currentDate.getUTCMonth();
        highlight = $highlightedDates.some((d) => datesEqual(d, date));
      }
    }
    {
      if ($_hiddenEvents && hiddenEvents.size) {
        let text = "+" + hiddenEvents.size + " more";
        if ($moreLinkContent) {
          is_function($moreLinkContent) ? $moreLinkContent({ num: hiddenEvents.size, text }) : $moreLinkContent;
        }
      }
    }
    showPopup = $_popupDate && datesEqual(date, $_popupDate);
    {
      if (showPopup && longChunks && dayChunks) {
        tick().then(setPopupChunks);
      }
    }
    {
      if ($_hiddenEvents) {
        debounce(reposition, debounceHandle, _queue);
      }
    }
    $$rendered = `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(otherMonth ? " " + $theme.otherMonth : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}"${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.dayHead, 0)}></div>  ${iChunks[1] && datesEqual(iChunks[1].date, date) ? `<div${add_attribute("class", $theme.events, 0)}>${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[1] }, {}, {})}</div>` : ``}  ${iChunks[0] && datesEqual(iChunks[0].date, date) ? `<div class="${escape($theme.events, true) + " " + escape($theme.preview, true)}">${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[0] }, {}, {})}</div>` : ``} <div${add_attribute("class", $theme.events, 0)}>${each(dayChunks, (chunk, i) => {
      return `${validate_component(Event, "Event").$$render(
        $$result,
        { chunk, longChunks, this: refs[i] },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> ${showPopup ? `${validate_component(Popup, "Popup").$$render($$result, {}, {}, {})}` : ``} <div${add_attribute("class", $theme.dayFoot, 0)}>${hiddenEvents.size ? `  <a role="button" tabindex="0" aria-haspopup="true"></a>` : ``}</div></div> `;
  } while (!$$settled);
  $$unsubscribe__hiddenEvents();
  $$unsubscribe__popupChunks();
  $$unsubscribe__popupDate();
  $$unsubscribe_moreLinkContent();
  $$unsubscribe_highlightedDates();
  $$unsubscribe_currentDate();
  $$unsubscribe__today();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  $$unsubscribe__intlDayCell();
  return $$rendered;
});
const Week = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let { dates } = $$props;
  let { _events, _iEvents, hiddenDays, theme } = getContext("state");
  validate_store(_events, "_events");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  validate_store(_iEvents, "_iEvents");
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  validate_store(hiddenDays, "hiddenDays");
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let chunks, longChunks, iChunks = [];
  let start;
  let end;
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  {
    {
      start = dates[0];
      end = addDay(cloneDate(dates[dates.length - 1]));
    }
  }
  {
    {
      chunks = [];
      for (let event of $_events) {
        if (!bgEvent(event.display) && eventIntersects(event, start, end)) {
          let chunk = createEventChunk(event, start, end);
          chunks.push(chunk);
        }
      }
      longChunks = prepareEventChunks(chunks, $hiddenDays);
    }
  }
  iChunks = $_iEvents.map((event) => {
    let chunk;
    if (event && eventIntersects(event, start, end)) {
      chunk = createEventChunk(event, start, end);
      prepareEventChunks([chunk], $hiddenDays);
    } else {
      chunk = null;
    }
    return chunk;
  });
  $$unsubscribe_hiddenDays();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  return `<div${add_attribute("class", $theme.days, 0)}>${each(dates, (date) => {
    return `${validate_component(Day, "Day").$$render($$result, { date, chunks, longChunks, iChunks }, {}, {})}`;
  })}</div>`;
});
const View = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_viewDates, $$unsubscribe__viewDates;
  let $$unsubscribe_dayMaxEvents;
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let { _viewDates, _hiddenEvents, dayMaxEvents, hiddenDays } = getContext("state");
  validate_store(_viewDates, "_viewDates");
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => $_viewDates = value);
  validate_store(_hiddenEvents, "_hiddenEvents");
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  validate_store(dayMaxEvents, "dayMaxEvents");
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => value);
  validate_store(hiddenDays, "hiddenDays");
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  let weeks;
  let days2;
  {
    {
      weeks = [];
      days2 = 7 - $hiddenDays.length;
      set_store_value(_hiddenEvents, $_hiddenEvents = {}, $_hiddenEvents);
      for (let i = 0; i < $_viewDates.length / days2; ++i) {
        let dates = [];
        for (let j = 0; j < days2; ++j) {
          dates.push($_viewDates[i * days2 + j]);
        }
        weeks.push(dates);
      }
    }
  }
  $$unsubscribe__viewDates();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_hiddenDays();
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {
    default: () => {
      return `${each(weeks, (dates) => {
        return `${validate_component(Week, "Week").$$render($$result, { dates }, {}, {})}`;
      })}`;
    }
  })}`;
});
const dayGrid = {
  createOptions(options) {
    options.dayMaxEvents = false;
    options.dayCellFormat = { day: "numeric" };
    options.dayPopoverFormat = { month: "long", day: "numeric", year: "numeric" };
    options.moreLinkContent = void 0;
    options.buttonText.dayGridMonth = "month";
    options.buttonText.close = "Close";
    options.theme.uniform = "ec-uniform";
    options.theme.dayFoot = "ec-day-foot";
    options.theme.popup = "ec-popup";
    options.view = "dayGridMonth";
    options.views.dayGridMonth = {
      buttonText: btnTextMonth,
      component: View,
      dayHeaderFormat: { weekday: "short" },
      displayEventEnd: false,
      duration: { months: 1 },
      theme: themeView("ec-day-grid ec-month-view"),
      titleFormat: { year: "numeric", month: "long" }
    };
  },
  createStores(state) {
    state._days = days(state);
    state._intlDayCell = intl(state.locale, state.dayCellFormat);
    state._intlDayPopover = intl(state.locale, state.dayPopoverFormat);
    state._hiddenEvents = writable({});
    state._popupDate = writable(null);
    state._popupChunks = writable([]);
  }
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let plugins = [TimeGrid, dayGrid];
  let options = {
    view: "dayGridMonth",
    height: "600px",
    allDaySlot: false,
    selectBackgroundColor: "white",
    headerToolbar: {
      start: "title",
      center: "dayGridMonth, timeGridWeek, timeGridDay",
      end: "today,prev,next"
    },
    events: []
  };
  return `<div class="Calender" style="position: absolute; top: 110px; width : 700px;">${validate_component(Calendar, "Calendar").$$render($$result, { plugins, options }, {}, {})}</div>`;
});
export {
  Page as default
};
