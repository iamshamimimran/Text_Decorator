import React, { useState, useRef } from 'react';

export default function TextForm({ showAlert, heading }) {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [showFindReplace, setShowFindReplace] = useState(false);
  const textRef = useRef(null);

  // --- Text Operations ---
  const handleUpCase = () => {
    setText(text.toUpperCase());
    showAlert('Converted to Uppercase', 'Success');
  };

  const handleLowCase = () => {
    setText(text.toLowerCase());
    showAlert('Converted to Lowercase', 'Success');
  };

  const handleTitleCase = () => {
    const titleCase = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(titleCase);
    showAlert('Converted to Title Case', 'Success');
  };

  const handleSentenceCase = () => {
    const sentences = text.split(/([.!?]\s+)/);
    const sentenceCase = sentences
      .map((part) => {
        // If it's a punctuation boundary, leave it as is
        if (/^[.!?]\s+$/.test(part)) return part;
        // Trim and capitalize first letter
        const trimmed = part.trim();
        if (trimmed.length === 0) return part;
        return part.replace(trimmed, trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
      })
      .join('');
    setText(sentenceCase);
    showAlert('Converted to Sentence Case', 'Success');
  };

  const clearText = () => {
    setText('');
    showAlert('Workspace Cleared', 'Warning');
  };

  const copyText = () => {
    if (textRef.current) {
      textRef.current.select();
      navigator.clipboard.writeText(text);
      document.getSelection()?.removeAllRanges();
      showAlert('Copied to Clipboard!', 'Success');
    }
  };

  const handleCleanSpaces = () => {
    const cleaned = text.split(/\s+/).join(' ').trim();
    setText(cleaned);
    showAlert('Cleaned Extra Spaces', 'Info');
  };

  const handleRemoveEmptyLines = () => {
    const cleaned = text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n');
    setText(cleaned);
    showAlert('Removed Empty Lines', 'Info');
  };

  const handleSortLines = () => {
    const sorted = text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .sort((a, b) => a.localeCompare(b))
      .join('\n');
    setText(sorted);
    showAlert('Sorted Lines Alphabetically', 'Info');
  };

  const handleFindReplace = (e) => {
    e.preventDefault();
    if (!findText) {
      showAlert('Please enter text to find', 'Warning');
      return;
    }
    // Escape special regex chars
    // eslint-disable-next-line no-useless-escape
    const escapedFind = findText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedFind, 'g');
    const replaced = text.replace(regex, replaceText);
    setText(replaced);
    showAlert('Replacements Completed', 'Success');
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // --- Calculations ---
  const cleanWordsArray = text.split(/\s+/).filter((element) => element.length !== 0);
  const wordCount = cleanWordsArray.length;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, '').length;
  
  const sentenceCount = text.split(/[.!?]+/).filter((element) => element.trim().length !== 0).length;
  const paragraphCount = text.split(/\n+/).filter((element) => element.trim().length !== 0).length;

  // Reading Time calculation (standard 200 WPM)
  const estimatedReadTime = 0.005 * wordCount; // (WordCount / 200)

  // Word Frequency list (Top 5 words)
  const getWordFrequency = () => {
    const freqMap = {};
    cleanWordsArray.forEach((w) => {
      // eslint-disable-next-line no-useless-escape
      const cleanWord = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      if (cleanWord) {
        freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
      }
    });
    return Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };
  const wordFrequency = getWordFrequency();

  return (
    <div className="row g-4">
      {/* LEFT COLUMN: Text Workspace */}
      <div className="col-lg-8 col-12">
        <div className="glass-panel p-4 h-100 transition-all d-flex flex-column gap-3">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="m-0" style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {heading}
            </h2>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-sm text-uppercase px-3 font-monospace transition-all"
                onClick={() => setShowFindReplace(!showFindReplace)}
                style={{
                  background: showFindReplace ? 'var(--accent-primary)' : 'var(--textarea-bg)',
                  border: '1px solid var(--panel-border)',
                  color: showFindReplace ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontWeight: '600',
                  borderRadius: '20px'
                }}
              >
                🔍 Find & Replace
              </button>
            </div>
          </div>

          {/* Collapsible Find and Replace drawer */}
          {showFindReplace && (
            <form 
              onSubmit={handleFindReplace}
              className="p-3 transition-all d-flex flex-wrap gap-2 align-items-end"
              style={{
                background: 'var(--textarea-bg)',
                borderRadius: '12px',
                border: '1px dashed var(--panel-border)',
                animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="flex-grow-1" style={{ minWidth: '150px' }}>
                <label className="form-label font-monospace m-1" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Find Text</label>
                <input 
                  type="text" 
                  className="form-control text-white" 
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="What to find..."
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>
              <div className="flex-grow-1" style={{ minWidth: '150px' }}>
                <label className="form-label font-monospace m-1" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Replace With</label>
                <input 
                  type="text" 
                  className="form-control text-white" 
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replace with..."
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>
              <button 
                type="submit"
                className="btn text-white transition-all font-monospace"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Replace All
              </button>
            </form>
          )}

          {/* Textarea Workspace */}
          <div className="position-relative flex-grow-1" style={{ minHeight: '320px' }}>
            <textarea
              className="form-control w-100 h-100 font-monospace p-3 text-white transition-all"
              onChange={handleOnChange}
              value={text}
              placeholder="Start typing or paste your content here..."
              ref={textRef}
              style={{
                background: 'var(--textarea-bg)',
                border: '1px solid var(--panel-border)',
                borderRadius: '12px',
                fontSize: '14px',
                lineHeight: '1.6',
                resize: 'none',
                minHeight: '320px',
                outline: 'none',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--textarea-focus-border)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--panel-border)'}
            />

            {/* Quick floating counters in corner */}
            <div 
              className="position-absolute d-flex gap-2"
              style={{ bottom: '15px', right: '15px', pointerEvents: 'none', opacity: 0.8 }}
            >
              <span className="badge font-monospace" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>
                {charCount} chars
              </span>
              <span className="badge font-monospace" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>
                {wordCount} words
              </span>
            </div>
          </div>

          {/* Button Operations Workspace */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleUpCase}
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              🔠 UPPERCASE
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleLowCase}
              style={{
                background: 'linear-gradient(135deg, var(--accent-secondary) 0%, #06b6d4 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              🔡 lowercase
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleTitleCase}
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              👑 Title Case
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleSentenceCase}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              📝 Sentence Case
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleCleanSpaces}
              style={{
                background: 'linear-gradient(135deg, var(--accent-success) 0%, #059669 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              ↔ Remove Spaces
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleRemoveEmptyLines}
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              ✂ Strip Lines
            </button>
            <button 
              disabled={text.length === 0} 
              className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
              onClick={handleSortLines}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                opacity: text.length === 0 ? 0.4 : 1,
                borderRadius: '10px',
                padding: '10px 14px'
              }}
            >
              ⇅ Sort A-Z
            </button>

            <div className="ms-auto d-flex gap-2">
              <button 
                disabled={text.length === 0} 
                className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
                onClick={copyText}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  opacity: text.length === 0 ? 0.4 : 1,
                  borderRadius: '10px',
                  padding: '10px 14px',
                  border: '1px solid var(--panel-border)'
                }}
                onMouseEnter={(e) => { if (text.length > 0) e.target.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              >
                📋 Copy
              </button>
              <button 
                disabled={text.length === 0} 
                className="btn btn-sm d-flex align-items-center gap-1 transition-all text-white font-monospace border-0" 
                onClick={clearText}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-danger) 0%, #dc2626 100%)',
                  opacity: text.length === 0 ? 0.4 : 1,
                  borderRadius: '10px',
                  padding: '10px 14px'
                }}
              >
                🗑 Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time Analytics & Live Preview */}
      <div className="col-lg-4 col-12 d-flex flex-column gap-4">
        {/* Dynamic Analytics Panel */}
        <div className="glass-panel p-4 transition-all">
          <h3 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Real-Time Analytics
          </h3>

          <div className="d-flex align-items-center gap-3 mb-4 p-3" style={{ background: 'var(--textarea-bg)', borderRadius: '12px' }}>
            {/* Visual SVG Progress Ring */}
            <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <svg width="60" height="60" viewBox="0 0 36 36">
                <path
                  className="transition-all"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--panel-border)"
                  strokeWidth="3"
                />
                <path
                  className="transition-all"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3.5"
                  strokeDasharray={`${Math.min(100, estimatedReadTime * 100)}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="position-absolute d-flex flex-column align-items-center">
                <span className="font-monospace" style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                  {estimatedReadTime < 0.1 ? '<1' : Math.ceil(estimatedReadTime)}
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>MIN</span>
              </div>
            </div>
            <div>
              <h4 className="m-0" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Estimated Reading</h4>
              <span className="font-monospace" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                WPM: 200 || Total read speed.
              </span>
            </div>
          </div>

          {/* Quick Details Stats List */}
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between p-2 font-monospace" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Chars (with spaces)</span>
              <strong style={{ color: 'var(--text-primary)' }}>{charCount}</strong>
            </div>
            <div className="d-flex justify-content-between p-2 font-monospace" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Chars (no spaces)</span>
              <strong style={{ color: 'var(--text-primary)' }}>{charNoSpacesCount}</strong>
            </div>
            <div className="d-flex justify-content-between p-2 font-monospace" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Sentences</span>
              <strong style={{ color: 'var(--text-primary)' }}>{sentenceCount}</strong>
            </div>
            <div className="d-flex justify-content-between p-2 font-monospace" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Paragraphs</span>
              <strong style={{ color: 'var(--text-primary)' }}>{paragraphCount}</strong>
            </div>
          </div>
        </div>

        {/* Word Frequency Analyzer Panel */}
        <div className="glass-panel p-4 transition-all">
          <h3 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Word Frequency
          </h3>
          {wordFrequency.length === 0 ? (
            <p className="font-monospace m-0 text-center py-2" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              No words to analyze yet.
            </p>
          ) : (
            <div className="d-flex flex-column gap-2 mt-2">
              {wordFrequency.map(([w, count], index) => (
                <div 
                  key={w} 
                  className="d-flex justify-content-between align-items-center p-2 font-monospace transition-all"
                  style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '8px', 
                    fontSize: '13px',
                    border: '1px solid rgba(255,255,255,0.03)'
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>#{index + 1}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{w}</span>
                  </div>
                  <span 
                    className="badge" 
                    style={{ 
                      background: 'var(--accent-primary-glow)', 
                      color: 'var(--accent-primary-hover)',
                      border: '1px solid rgba(168, 85, 247, 0.2)'
                    }}
                  >
                    {count} {count === 1 ? 'time' : 'times'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Premium Preview Block */}
        <div className="glass-panel d-flex flex-column transition-all" style={{ flexGrow: 1 }}>
          <div className="glass-card-header d-flex justify-content-between align-items-center">
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Live Output Preview
            </span>
            <button
              disabled={text.length === 0}
              onClick={copyText}
              className="btn btn-sm p-0 px-2 font-monospace border-0"
              style={{
                fontSize: '11px',
                color: text.length > 0 ? 'var(--accent-primary)' : 'var(--text-muted)',
                background: 'transparent',
                fontWeight: 'bold'
              }}
            >
              COPY
            </button>
          </div>
          <div 
            className="p-3 font-monospace"
            style={{
              flexGrow: 1,
              background: 'var(--textarea-bg)',
              fontSize: '13px',
              color: text.length > 0 ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottomLeftRadius: '15px',
              borderBottomRightRadius: '15px',
              minHeight: '120px',
              maxHeight: '220px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {text.length > 0 ? text : 'Nothing to preview... Output will synchronize live with typing.'}
          </div>
        </div>
      </div>
    </div>
  );
}
